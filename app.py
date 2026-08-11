from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from price_tracker import PriceDatabase, FlightPriceTracker
from datetime import datetime, timedelta
import json

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

db = PriceDatabase()
tracker = FlightPriceTracker()


@app.route('/')
def home():
    return redirect('/dashboard.html')

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Flight Price Tracker API running'})

@app.route('/api/price-trends', methods=['GET'])
def get_price_trends():
    from_airport = request.args.get('from', 'SCL')
    to_airport = request.args.get('to', 'MIA')
    departure_date = request.args.get('date')
    
    if not departure_date:
        departure_date = (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d')
    
    trends = db.get_price_trends(from_airport, to_airport, departure_date)
    return jsonify({'trends': trends, 'route': f'{from_airport}-{to_airport}', 'date': departure_date})

@app.route('/api/cheapest-flights', methods=['GET'])
def get_cheapest():
    from_airport = request.args.get('from', 'SCL')
    to_airport = request.args.get('to', 'MIA')
    departure_date = request.args.get('date')
    limit = request.args.get('limit', 5, type=int)
    
    if not departure_date:
        departure_date = (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d')
    
    flights = db.get_cheapest_flights(from_airport, to_airport, departure_date, limit)
    return jsonify({'flights': flights})

@app.route('/api/track-prices', methods=['POST'])
def track_prices():
    data = request.json
    departure_date = data.get('date')
    
    if not departure_date:
        departure_date = (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d')
    
    tracker.track_prices(departure_date)
    return jsonify({'status': 'tracking started', 'date': departure_date})

@app.route('/api/routes', methods=['GET'])
def get_routes():
    return jsonify({'routes': tracker.routes})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
