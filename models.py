from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Car(db.Model):
    __tablename__ = "cars"

    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(60), nullable=False)
    model = db.Column(db.String(80), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(12, 2), nullable=False)
    body_type = db.Column(db.String(40), nullable=False)
    fuel = db.Column(db.String(30), nullable=False)
    transmission = db.Column(db.String(30), nullable=False)
    mileage_km = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(500), nullable=False)
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "make": self.make,
            "model": self.model,
            "year": self.year,
            "price": float(self.price),
            "type": self.body_type,
            "fuel": self.fuel,
            "transmission": self.transmission,
            "mileage_km": self.mileage_km,
            "location": self.location,
            "image": self.image,
        }


class Inquiry(db.Model):
    __tablename__ = "inquiries"

    id = db.Column(db.Integer, primary_key=True)
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    car = db.relationship("Car")


class Bid(db.Model):
    __tablename__ = "bids"

    id = db.Column(db.Integer, primary_key=True)
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)
    bidder_name = db.Column(db.String(120), nullable=False)
    bidder_email = db.Column(db.String(150), nullable=False)
    amount = db.Column(db.Numeric(12, 2), nullable=False)
    status = db.Column(db.String(20), default="pending")  # pending, accepted, rejected, outbid
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    car = db.relationship("Car", backref="bids")

    def to_dict(self):
        return {
            "id": self.id,
            "bidder_name": self.bidder_name,
            "amount": float(self.amount),
            "status": self.status,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M"),
        }
