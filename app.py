from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from decimal import Decimal

from config import Config
from models import db, Car, Inquiry, Bid
from seed import run_seed
from ml_models import predict_price, price_confidence_band, training_r2, MAKES, BODY_TYPES, FUELS, TRANSMISSIONS

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)


def get_filter_options():
    makes = [m[0] for m in db.session.query(Car.make).distinct().order_by(Car.make).all()]
    types = [t[0] for t in db.session.query(Car.body_type).distinct().order_by(Car.body_type).all()]
    return makes, types


PRICE_BANDS = {
    "0-500k": (0, 500_000),
    "500k-1m": (500_000, 1_000_000),
    "1m-2m": (1_000_000, 2_000_000),
    "2m-5m": (2_000_000, 5_000_000),
    "5m+": (5_000_000, None),
}


@app.route("/")
def index():
    featured = Car.query.filter_by(featured=True).all()
    recent = Car.query.order_by(Car.created_at.desc()).limit(4).all()
    makes, types = get_filter_options()
    return render_template("index.html", featured=featured, recent=recent, makes=makes, types=types)


@app.route("/cars")
def cars():
    query = Car.query

    make = request.args.get("make", "")
    body_type = request.args.get("type", "")
    price_band = request.args.get("price", "")
    q = request.args.get("q", "").strip()

    if make:
        query = query.filter(Car.make.ilike(f"%{make}%"))
    if body_type and body_type != "All":
        query = query.filter(Car.body_type == body_type)
    if price_band in PRICE_BANDS:
        low, high = PRICE_BANDS[price_band]
        query = query.filter(Car.price >= low)
        if high:
            query = query.filter(Car.price <= high)
    if q:
        like = f"%{q}%"
        query = query.filter((Car.make.ilike(like)) | (Car.model.ilike(like)))

    listings = query.order_by(Car.created_at.desc()).all()
    makes, types = get_filter_options()
    return render_template(
        "cars.html", cars=listings, makes=makes, types=types,
        active_type=body_type or "All", active_make=make, active_price=price_band, q=q,
    )


@app.route("/car/<int:car_id>")
def car_detail(car_id):
    car = Car.query.get_or_404(car_id)

    predicted = predict_price(
        car.make, car.body_type, car.fuel, car.transmission, car.year, car.mileage_km
    )
    low, high = price_confidence_band(predicted)
    listed = float(car.price)
    if listed > high:
        price_verdict = "Listed above our estimated fair range"
    elif listed < low:
        price_verdict = "Listed below our estimated fair range — good deal"
    else:
        price_verdict = "Listed within our estimated fair range"

    bids = Bid.query.filter_by(car_id=car.id).order_by(Bid.amount.desc()).all()
    highest_bid = bids[0] if bids else None

    return render_template(
        "car_detail.html",
        car=car,
        predicted_price=predicted,
        price_range=(low, high),
        price_verdict=price_verdict,
        bids=bids,
        highest_bid=highest_bid,
    )


@app.route("/car/<int:car_id>/bid", methods=["POST"])
def place_bid(car_id):
    car = Car.query.get_or_404(car_id)
    name = request.form.get("bidder_name", "").strip()
    email = request.form.get("bidder_email", "").strip()

    try:
        amount = Decimal(request.form.get("amount", "0"))
    except Exception:
        flash("Enter a valid bid amount.", "error")
        return redirect(url_for("car_detail", car_id=car_id))

    if not name or not email:
        flash("Name and email are required to place a bid.", "error")
        return redirect(url_for("car_detail", car_id=car_id))

    current_high = (
        db.session.query(db.func.max(Bid.amount)).filter_by(car_id=car_id).scalar()
    )
    min_required = current_high if current_high else Decimal(car.price) * Decimal("0.5")

    if amount <= min_required:
        flash(f"Your bid must be higher than the current highest bid (KES {min_required:,.0f}).", "error")
        return redirect(url_for("car_detail", car_id=car_id))

    # Mark previous highest bid as outbid
    Bid.query.filter_by(car_id=car_id, status="pending").update({"status": "outbid"})

    db.session.add(Bid(
        car_id=car_id, bidder_name=name, bidder_email=email,
        amount=amount, status="pending",
    ))
    db.session.commit()
    flash("Your bid has been placed!", "success")
    return redirect(url_for("car_detail", car_id=car_id))


@app.route("/api/predict-price", methods=["POST"])
def api_predict_price():
    data = request.get_json(force=True)
    try:
        price = predict_price(
            data["make"], data["body_type"], data["fuel"], data["transmission"],
            int(data["year"]), int(data["mileage_km"]),
        )
        low, high = price_confidence_band(price)
        return jsonify({"predicted_price": price, "range": [low, high]})
    except (KeyError, ValueError) as e:
        return jsonify({"error": str(e)}), 400


@app.route("/dashboard")
def dashboard():
    total_cars = Car.query.count()
    total_bids = Bid.query.count()
    total_inquiries = Inquiry.query.count()

    avg_price_by_make = (
        db.session.query(Car.make, db.func.avg(Car.price))
        .group_by(Car.make)
        .order_by(db.func.avg(Car.price).desc())
        .all()
    )
    cars_by_body_type = (
        db.session.query(Car.body_type, db.func.count(Car.id))
        .group_by(Car.body_type)
        .all()
    )
    top_bid_cars = (
        db.session.query(Car, db.func.max(Bid.amount).label("high_bid"), db.func.count(Bid.id).label("bid_count"))
        .join(Bid)
        .group_by(Car.id)
        .order_by(db.desc("bid_count"))
        .limit(5)
        .all()
    )
    recent_bids = Bid.query.order_by(Bid.created_at.desc()).limit(10).all()

    return render_template(
        "dashboard.html",
        total_cars=total_cars,
        total_bids=total_bids,
        total_inquiries=total_inquiries,
        avg_price_by_make=avg_price_by_make,
        cars_by_body_type=cars_by_body_type,
        top_bid_cars=top_bid_cars,
        recent_bids=recent_bids,
        model_r2=training_r2(),
    )


@app.route("/inquire/<int:car_id>", methods=["POST"])
def inquire(car_id):
    car = Car.query.get_or_404(car_id)
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()

    if not name or not email or not message:
        flash("Please fill in all fields.", "error")
        return redirect(url_for("car_detail", car_id=car_id))

    db.session.add(Inquiry(car_id=car.id, name=name, email=email, message=message))
    db.session.commit()
    flash("Your inquiry has been sent to our sales team!", "success")
    return redirect(url_for("car_detail", car_id=car_id))


@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        message = request.form.get("message", "").strip()
        if not name or not email or not message:
            flash("Please fill in all fields.", "error")
        else:
            db.session.add(Inquiry(car_id=None, name=name, email=email, message=message))
            db.session.commit()
            flash("Thanks — we'll be in touch shortly.", "success")
            return redirect(url_for("contact"))
    return render_template("contact.html")


@app.route("/api/cars")
def api_cars():
    return jsonify([c.to_dict() for c in Car.query.all()])


def bootstrap_db():
    with app.app_context():
        db.create_all()
        run_seed(db, Car)


if __name__ == "__main__":
    bootstrap_db()
    app.run(debug=True, port=5001)
else:
    bootstrap_db()
