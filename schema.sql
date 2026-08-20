-- Reference schema. Tables are created automatically by SQLAlchemy on first
-- run, as long as the `chekiio` database already exists (see README).

CREATE DATABASE IF NOT EXISTS chekiio CHARACTER SET utf8mb4;
USE chekiio;

CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(60) NOT NULL,
    model VARCHAR(80) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    body_type VARCHAR(40) NOT NULL,
    fuel VARCHAR(30) NOT NULL,
    transmission VARCHAR(30) NOT NULL,
    mileage_km INT NOT NULL,
    location VARCHAR(80) NOT NULL,
    image VARCHAR(500) NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    created_at DATETIME
);

CREATE TABLE inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NULL,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME,
    FOREIGN KEY (car_id) REFERENCES cars(id)
);
