CARS = [
    dict(make="Toyota", model="Premio", year=2018, price=1850000, body_type="Sedan",
         fuel="Petrol", transmission="Automatic", mileage_km=85000, location="Nairobi",
         image="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
         featured=True),
    dict(make="Toyota", model="Land Cruiser Prado", year=2020, price=8500000, body_type="SUV",
         fuel="Diesel", transmission="Automatic", mileage_km=45000, location="Mombasa",
         image="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
         featured=True),
    dict(make="Nissan", model="X-Trail", year=2019, price=3200000, body_type="SUV",
         fuel="Petrol", transmission="Automatic", mileage_km=60000, location="Nakuru",
         image="https://images.unsplash.com/photo-1593941707882-a5bba5338fe2?auto=format&fit=crop&w=800&q=80",
         featured=True),
    dict(make="Subaru", model="Forester", year=2021, price=4200000, body_type="SUV",
         fuel="Petrol", transmission="Automatic", mileage_km=30000, location="Kisumu",
         image="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
         featured=True),
    dict(make="Mercedes-Benz", model="C-Class", year=2020, price=9500000, body_type="Luxury",
         fuel="Petrol", transmission="Automatic", mileage_km=25000, location="Nairobi",
         image="https://images.unsplash.com/photo-1563720223486-3294267254c9?auto=format&fit=crop&w=800&q=80"),
    dict(make="Toyota", model="Hilux", year=2022, price=6800000, body_type="Pickup",
         fuel="Diesel", transmission="Manual", mileage_km=15000, location="Eldoret",
         image="https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?auto=format&fit=crop&w=800&q=80"),
    dict(make="Mazda", model="Demio", year=2017, price=1500000, body_type="Hatchback",
         fuel="Petrol", transmission="Automatic", mileage_km=95000, location="Thika",
         image="https://images.unsplash.com/photo-1605559915557-ccd57c38d2c7?auto=format&fit=crop&w=800&q=80"),
    dict(make="BMW", model="X5", year=2019, price=12500000, body_type="Luxury",
         fuel="Diesel", transmission="Automatic", mileage_km=40000, location="Nairobi",
         image="https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&w=800&q=80"),
]


def run_seed(db, Car):
    if Car.query.count() > 0:
        return
    for c in CARS:
        db.session.add(Car(**c))
    db.session.commit()
