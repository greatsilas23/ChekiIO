"""
Lightweight ML model for car price prediction.
Trained on synthetic but realistic Kenyan used-car market data at import time.
"""
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

MAKES = ["Toyota", "Nissan", "Mazda", "Subaru", "Honda", "Mercedes-Benz", "BMW", "Volkswagen"]
BODY_TYPES = ["Sedan", "SUV", "Hatchback", "Pickup", "Van", "Coupe"]
FUELS = ["Petrol", "Diesel", "Hybrid"]
TRANSMISSIONS = ["Automatic", "Manual"]

# Base price (KES) and typical depreciation/mileage sensitivity per make.
# Rough approximation of the Kenyan used-import market (Toyota/Nissan hold value
# well, German makes start higher but depreciate faster, etc).
_MAKE_PROFILE = {
    "Toyota":        {"base": 1_600_000, "dep_per_year": 60_000,  "dep_per_1000km": 900},
    "Nissan":        {"base": 1_300_000, "dep_per_year": 55_000,  "dep_per_1000km": 850},
    "Mazda":         {"base": 1_400_000, "dep_per_year": 58_000,  "dep_per_1000km": 880},
    "Subaru":        {"base": 1_500_000, "dep_per_year": 62_000,  "dep_per_1000km": 950},
    "Honda":         {"base": 1_350_000, "dep_per_year": 57_000,  "dep_per_1000km": 860},
    "Mercedes-Benz": {"base": 3_200_000, "dep_per_year": 140_000, "dep_per_1000km": 1_800},
    "BMW":           {"base": 3_000_000, "dep_per_year": 135_000, "dep_per_1000km": 1_750},
    "Volkswagen":    {"base": 1_900_000, "dep_per_year": 90_000,  "dep_per_1000km": 1_200},
}

_BODY_MULTIPLIER = {"SUV": 1.25, "Pickup": 1.2, "Van": 1.1, "Sedan": 1.0, "Coupe": 1.05, "Hatchback": 0.85}
_FUEL_MULTIPLIER = {"Hybrid": 1.15, "Diesel": 1.05, "Petrol": 1.0}
_TRANS_MULTIPLIER = {"Automatic": 1.08, "Manual": 1.0}

CURRENT_YEAR = 2026


def _generate_training_data(n_samples=1500, seed=42):
    rng = np.random.RandomState(seed)
    X, y = [], []

    for _ in range(n_samples):
        make = rng.choice(MAKES)
        body = rng.choice(BODY_TYPES)
        fuel = rng.choice(FUELS)
        trans = rng.choice(TRANSMISSIONS)
        year = rng.randint(2008, CURRENT_YEAR)
        age = CURRENT_YEAR - year
        mileage = max(5_000, int(rng.normal(age * 18_000, 15_000)))

        profile = _MAKE_PROFILE[make]
        price = profile["base"]
        price -= profile["dep_per_year"] * age
        price -= profile["dep_per_1000km"] * (mileage / 1000)
        price *= _BODY_MULTIPLIER[body]
        price *= _FUEL_MULTIPLIER[fuel]
        price *= _TRANS_MULTIPLIER[trans]
        price = max(300_000, price)
        price += rng.normal(0, price * 0.06)  # market noise
        price = max(300_000, price)

        X.append([make, body, fuel, trans, year, mileage])
        y.append(price)

    return X, np.array(y)


def _encode_rows(rows, encoders):
    encoded = []
    for r in rows:
        make, body, fuel, trans, year, mileage = r
        encoded.append([
            encoders["make"].transform([make])[0],
            encoders["body"].transform([body])[0],
            encoders["fuel"].transform([fuel])[0],
            encoders["trans"].transform([trans])[0],
            year,
            mileage,
        ])
    return np.array(encoded)


_raw_X, _y = _generate_training_data()

_encoders = {
    "make": LabelEncoder().fit(MAKES),
    "body": LabelEncoder().fit(BODY_TYPES),
    "fuel": LabelEncoder().fit(FUELS),
    "trans": LabelEncoder().fit(TRANSMISSIONS),
}

_X = _encode_rows(_raw_X, _encoders)

_price_model = RandomForestRegressor(n_estimators=150, max_depth=14, random_state=42, n_jobs=-1)
_price_model.fit(_X, _y)

# Rough R^2 on the training data itself (report as an in-sample fit indicator,
# not a held-out test score — be upfront about that distinction in the README).
_train_r2 = _price_model.score(_X, _y)


def predict_price(make, body_type, fuel, transmission, year, mileage_km):
    """Predict a fair market price (KES) for a used car with these attributes."""
    try:
        row = _encode_rows([[make, body_type, fuel, transmission, year, mileage_km]], _encoders)
    except ValueError:
        # Unseen category — fall back to nearest known values
        make = make if make in MAKES else MAKES[0]
        body_type = body_type if body_type in BODY_TYPES else BODY_TYPES[0]
        fuel = fuel if fuel in FUELS else FUELS[0]
        transmission = transmission if transmission in TRANSMISSIONS else TRANSMISSIONS[0]
        row = _encode_rows([[make, body_type, fuel, transmission, year, mileage_km]], _encoders)

    price = float(_price_model.predict(row)[0])
    return round(max(200_000, price), -3)  # round to nearest 1,000 KES


def price_confidence_band(predicted_price):
    """Return a rough +/- range to display alongside the point estimate."""
    margin = predicted_price * 0.08
    return round(predicted_price - margin, -3), round(predicted_price + margin, -3)


def training_r2():
    return round(_train_r2, 3)
