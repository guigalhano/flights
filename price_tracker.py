# -*- coding: utf-8 -*-
import json
import sqlite3
from datetime import datetime, timedelta
from typing import List, Dict, Any

class PriceDatabase:
    def __init__(self, db_path='price_history.db'):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS prices (
                id INTEGER PRIMARY KEY,
                date_recorded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                departure_date TEXT NOT NULL,
                from_airport TEXT NOT NULL,
                to_airport TEXT NOT NULL,
                airline TEXT,
                price REAL NOT NULL,
                currency TEXT DEFAULT 'USD',
                duration_minutes INTEGER,
                stops INTEGER,
                departure_time TEXT,
                arrival_time TEXT,
                booking_url TEXT
            )
        ''')
        conn.commit()
        conn.close()
    
    def insert_price(self, flight_data: Dict[str, Any]):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO prices (
                departure_date, from_airport, to_airport, airline, price, 
                currency, duration_minutes, stops, departure_time, arrival_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            flight_data.get('departure_date'),
            flight_data.get('from_airport'),
            flight_data.get('to_airport'),
            flight_data.get('airline'),
            flight_data.get('price'),
            flight_data.get('currency', 'USD'),
            flight_data.get('duration_minutes'),
            flight_data.get('stops'),
            flight_data.get('departure_time'),
            flight_data.get('arrival_time')
        ))
        
        conn.commit()
        conn.close()
    
    def get_price_trends(self, from_airport, to_airport, departure_date):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT DATE(date_recorded) as date, 
                   MIN(price) as min_price,
                   MAX(price) as max_price,
                   AVG(price) as avg_price,
                   COUNT(*) as flight_count
            FROM prices
            WHERE from_airport = ? AND to_airport = ? AND departure_date = ?
            GROUP BY DATE(date_recorded)
            ORDER BY date ASC
        ''', (from_airport, to_airport, departure_date))
        
        columns = ['date', 'min_price', 'max_price', 'avg_price', 'flight_count']
        rows = cursor.fetchall()
        conn.close()
        
        return [dict(zip(columns, row)) for row in rows]
    
    def get_cheapest_flights(self, from_airport, to_airport, departure_date, limit=5):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT * FROM prices
            WHERE from_airport = ? AND to_airport = ? AND departure_date = ?
            ORDER BY price ASC
            LIMIT ?
        ''', (from_airport, to_airport, departure_date, limit))
        
        columns = [description[0] for description in cursor.description]
        rows = cursor.fetchall()
        conn.close()
        
        return [dict(zip(columns, row)) for row in rows]


class FlightPriceTracker:
    def __init__(self, db_path='price_history.db'):
        self.db = PriceDatabase(db_path)
        self.routes = [
            # Brazil - 9 routes
            {"from": "SCL", "to": "GIG", "city": "Rio de Janeiro, Brazil"},
            {"from": "SCL", "to": "GRU", "city": "São Paulo, Brazil"},
            {"from": "SCL", "to": "BSB", "city": "Brasília, Brazil"},
            {"from": "SCL", "to": "CNF", "city": "Belo Horizonte, Brazil"},
            {"from": "SCL", "to": "BEL", "city": "Belém, Brazil"},
            {"from": "SCL", "to": "SSA", "city": "Salvador, Brazil"},
            {"from": "SCL", "to": "REC", "city": "Recife, Brazil"},
            {"from": "SCL", "to": "CWB", "city": "Curitiba, Brazil"},
            {"from": "SCL", "to": "POA", "city": "Porto Alegre, Brazil"},
            # Argentina - 6 routes
            {"from": "SCL", "to": "EZE", "city": "Buenos Aires, Argentina"},
            {"from": "SCL", "to": "AEP", "city": "Buenos Aires Aeroparque, Argentina"},
            {"from": "SCL", "to": "MDQ", "city": "Mar del Plata, Argentina"},
            {"from": "SCL", "to": "MZA", "city": "Mendoza, Argentina"},
            {"from": "SCL", "to": "ROS", "city": "Rosario, Argentina"},
            {"from": "SCL", "to": "SVJ", "city": "San Juan, Argentina"},
            # Peru - 4 routes
            {"from": "SCL", "to": "LIM", "city": "Lima, Peru"},
            {"from": "SCL", "to": "CUZ", "city": "Cusco, Peru"},
            {"from": "SCL", "to": "AYP", "city": "Arequipa, Peru"},
            {"from": "SCL", "to": "PEM", "city": "Puerto Maldonado, Peru"},
            # Uruguay - 1 route
            {"from": "SCL", "to": "MVD", "city": "Montevideo, Uruguay"},
            # Paraguay - 1 route
            {"from": "SCL", "to": "ASU", "city": "Asunción, Paraguay"},
            # Bolivia - 3 routes
            {"from": "SCL", "to": "LPB", "city": "La Paz, Bolivia"},
            {"from": "SCL", "to": "VVI", "city": "Santa Cruz de la Sierra, Bolivia"},
            {"from": "SCL", "to": "CBB", "city": "Cochabamba, Bolivia"},
            # Reverse routes - South America to Santiago
            # Brazil to Santiago
            {"from": "GIG", "to": "SCL", "city": "Rio de Janeiro to Santiago"},
            {"from": "GRU", "to": "SCL", "city": "São Paulo to Santiago"},
            {"from": "BSB", "to": "SCL", "city": "Brasília to Santiago"},
            {"from": "CNF", "to": "SCL", "city": "Belo Horizonte to Santiago"},
            {"from": "BEL", "to": "SCL", "city": "Belém to Santiago"},
            {"from": "SSA", "to": "SCL", "city": "Salvador to Santiago"},
            {"from": "REC", "to": "SCL", "city": "Recife to Santiago"},
            {"from": "CWB", "to": "SCL", "city": "Curitiba to Santiago"},
            {"from": "POA", "to": "SCL", "city": "Porto Alegre to Santiago"},
            # Argentina to Santiago
            {"from": "EZE", "to": "SCL", "city": "Buenos Aires to Santiago"},
            {"from": "AEP", "to": "SCL", "city": "Buenos Aires Aeroparque to Santiago"},
            {"from": "MDQ", "to": "SCL", "city": "Mar del Plata to Santiago"},
            {"from": "MZA", "to": "SCL", "city": "Mendoza to Santiago"},
            {"from": "ROS", "to": "SCL", "city": "Rosario to Santiago"},
            {"from": "SVJ", "to": "SCL", "city": "San Juan to Santiago"},
            # Peru to Santiago
            {"from": "LIM", "to": "SCL", "city": "Lima to Santiago"},
            {"from": "CUZ", "to": "SCL", "city": "Cusco to Santiago"},
            {"from": "AYP", "to": "SCL", "city": "Arequipa to Santiago"},
            {"from": "PEM", "to": "SCL", "city": "Puerto Maldonado to Santiago"},
            # Uruguay to Santiago
            {"from": "MVD", "to": "SCL", "city": "Montevideo to Santiago"},
            # Paraguay to Santiago
            {"from": "ASU", "to": "SCL", "city": "Asunción to Santiago"},
            # Bolivia to Santiago
            {"from": "LPB", "to": "SCL", "city": "La Paz to Santiago"},
            {"from": "VVI", "to": "SCL", "city": "Santa Cruz de la Sierra to Santiago"},
            {"from": "CBB", "to": "SCL", "city": "Cochabamba to Santiago"},
        ]
    
    def fetch_flights(self, from_airport, to_airport, date):
        try:
            from fast_flights import FlightQuery, Passengers, create_query, get_flights
            
            query = create_query(
                flights=[FlightQuery(date=date, from_airport=from_airport, to_airport=to_airport)],
                seat='economy',
                trip='one-way',
                passengers=Passengers(adults=1),
                currency='USD',
            )
            
            results = get_flights(query)
            flights = []
            
            if hasattr(results, '__iter__'):
                for flight in results:
                    flights.append({
                        'departure_date': date,
                        'from_airport': from_airport,
                        'to_airport': to_airport,
                        'airline': getattr(flight, 'airline', 'Unknown'),
                        'price': getattr(flight, 'price', 0),
                        'currency': 'USD',
                        'duration_minutes': getattr(flight, 'duration', 0),
                        'stops': getattr(flight, 'stops', 0),
                        'departure_time': getattr(flight, 'departure_time', ''),
                        'arrival_time': getattr(flight, 'arrival_time', '')
                    })
            
            return flights
        
        except Exception as e:
            print(f'Error fetching flights: {e}')
            return []
    
    def track_prices(self, departure_date):
        print(f'Tracking prices for {departure_date}')
        
        for route in self.routes:
            try:
                flights = self.fetch_flights(route['from'], route['to'], departure_date)
                for flight in flights:
                    self.db.insert_price(flight)
                    print(f"Recorded: {route['from']} -> {route['to']}: ${flight.get('price')}")
            except Exception as e:
                print(f"Error: {e}")


if __name__ == '__main__':
    db = PriceDatabase()
    print('Database initialized')
