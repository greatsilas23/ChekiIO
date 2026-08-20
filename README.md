# AfriAuto (ChekiIO) — Flask + MySQL

A fullstack rebuild of the original single-page AfriAuto car marketplace demo.
Car listings, search/filtering, and buyer inquiries are now backed by a real
MySQL database instead of a hardcoded JS array.

## Stack
- **Backend:** Flask, Flask-SQLAlchemy
- **Database:** MySQL (via PyMySQL driver)
- **Frontend:** Jinja2 templates + redesigned stylesheet, no build step

## Setup

1. **Create the database:**
   ```sql
   CREATE DATABASE chekiio CHARACTER SET utf8mb4;
   ```

2. **Install dependencies:**
   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # edit .env with your MySQL username/password
   ```

4. **Run:**
   ```bash
   python app.py
   ```
   Visit http://localhost:5001 — tables are created and seeded with sample
   car listings automatically on first launch.

## What's included
- Home page with featured/recent listings pulled from the `cars` table
- `/cars` — full listing with make, body-type, price-range, and text search
  filters, all applied server-side via SQL queries
- Car detail page with a buyer inquiry form (`inquiries` table)
- General contact form (also saved to `inquiries`, with `car_id` left null)
- `/api/cars` — simple JSON endpoint listing all cars

## Notes
- Minimal by design: no seller-side "list your car" form or admin panel yet —
  add cars via `seed.py` or directly in MySQL for now.
- No authentication in this version; inquiries are anonymous (name/email
  collected on the form itself).
