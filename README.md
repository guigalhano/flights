# Flight Price History Tracker

Track flight price history to and from Santiago with real-time monitoring and price trend analysis.

## Features

### Price Tracking
- **Automated Price Scraping**: Uses `fast-flights` library to scrape Google Flights data
- **Historical Data**: Stores price history in SQLite database
- **Multiple Routes**: Monitors flights across major routes to/from Santiago (SCL)

### Dashboard Features
- **Price Trends**: Visualize price changes over time with interactive charts
- **Best Deals**: Find the cheapest flights for your preferred date
- **Price History**: Browse all recorded prices for a route
- **Route Selection**: Filter by departure and destination airports

### Data Collection
- Tracks airlines, prices, flight duration, stops, and departure/arrival times
- Stores timestamps for trend analysis
- Automatically scheduled price updates

## Project Structure

```
flights/
├── app.py                  # Flask API backend
├── price_tracker.py        # Price scraping and database management
├── dashboard.html          # Price tracker dashboard
├── css/
│   ├── style.css          # Original dashboard styles
│   └── dashboard.css      # Price tracker styles
├── js/
│   ├── app.js             # Original app logic
│   ├── data.js            # Original flight data
│   └── dashboard.js       # Price tracker frontend logic
├── requirements.txt       # Python dependencies
└── README.md
```

## Installation

### Prerequisites
- Python 3.8+
- pip
- Modern web browser

### Setup

1. **Clone the repository**:
```bash
git clone https://github.com/guigalhano/flights.git
cd flights
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Run the backend**:
```bash
python app.py
```

The API will start at `http://localhost:5000`

4. **Open the dashboard**:
Open `dashboard.html` in your web browser

## Usage

### Tracking Prices

1. **Select Route**: Choose departure and arrival airports
2. **Pick Date**: Select your desired flight date
3. **Search**: Click "Search Prices" to fetch current prices
4. **Track**: Click "Start Tracking" to begin monitoring prices

### Dashboard Tabs

- **Price Trends**: Shows average, minimum, and maximum prices over time
- **Best Deals**: Lists the 5 cheapest flights for selected date
- **History**: Displays all recorded flights and prices

### Supported Routes

Default tracked routes:
- Santiago (SCL) ↔ Miami (MIA)
- Santiago (SCL) ↔ New York (JFK)
- Santiago (SCL) ↔ Mexico City (MEX)
- Santiago (SCL) ↔ Bogota (BOG)
- Santiago (SCL) ↔ Buenos Aires (BUE)

## Technology Stack

### Backend
- **Flask**: REST API server
- **fast-flights**: Google Flights scraper
- **SQLite**: Price history database
- **Schedule**: Automated price tracking

### Frontend
- **HTML5/CSS3**: Responsive design
- **JavaScript (ES6+)**: Interactive dashboard
- **Chart.js**: Price trend visualization
- **Fetch API**: Backend communication

## API Endpoints

### GET `/api/health`
Health check endpoint

### GET `/api/price-trends`
Get price trends for a route
```
Parameters:
- from: Departure airport code (default: SCL)
- to: Destination airport code (default: MIA)
- date: Flight departure date (YYYY-MM-DD)

Response:
{
  "trends": [
    {"date": "2024-08-15", "min_price": 250, "max_price": 450, "avg_price": 350, "flight_count": 12}
  ],
  "route": "SCL-MIA",
  "date": "2024-08-22"
}
```

### GET `/api/cheapest-flights`
Get cheapest flights for a route and date
```
Parameters:
- from: Departure airport code (default: SCL)
- to: Destination airport code (default: MIA)
- date: Flight departure date (YYYY-MM-DD)
- limit: Number of results (default: 5)

Response:
{
  "flights": [
    {
      "airline": "LATAM",
      "price": 245,
      "departure_time": "08:30",
      "arrival_time": "14:45",
      "stops": 0
    }
  ]
}
```

### POST `/api/track-prices`
Start price tracking for a date
```
Body:
{"date": "2024-08-22"}

Response:
{"status": "tracking started", "date": "2024-08-22"}
```

### GET `/api/routes`
Get list of monitored routes
```
Response:
{
  "routes": [
    {"from": "SCL", "to": "MIA"},
    {"from": "SCL", "to": "JFK"}
  ]
}
```

## Database Schema

### prices table
- `id`: Primary key
- `date_recorded`: Timestamp of when price was recorded
- `departure_date`: Flight departure date
- `from_airport`: Departure airport code
- `to_airport`: Destination airport code
- `airline`: Airline name
- `price`: Flight price in USD
- `currency`: Currency (default: USD)
- `duration_minutes`: Flight duration
- `stops`: Number of stops
- `departure_time`: Departure time
- `arrival_time`: Arrival time

## Configuration

### Adding New Routes

Edit `price_tracker.py` and modify the `routes` list in `FlightPriceTracker.__init__`:

```python
self.routes = [
    {"from": "SCL", "to": "MIA"},
    {"from": "SCL", "to": "JFK"},
    # Add your routes here
]
```

### Scheduled Price Tracking

To set up automatic price tracking, use Python's `schedule` library:

```python
import schedule
import time
from price_tracker import FlightPriceTracker

tracker = FlightPriceTracker()

schedule.every().day.at("10:00").do(tracker.track_prices, "2024-08-22")

while True:
    schedule.run_pending()
    time.sleep(60)
```

## Browser Support

- Chrome/Chromium: Full support
- Firefox: Full support
- Safari: Full support
- Edge: Full support
- Mobile browsers: Responsive design

## Future Enhancements

- [ ] Automated scheduled tracking with notifications
- [ ] Price alert system (notify when prices drop)
- [ ] Export price history (CSV, PDF)
- [ ] Predictive price analysis
- [ ] Comparison with competitor prices
- [ ] Email notifications
- [ ] Dark mode improvements
- [ ] Price prediction algorithm
- [ ] Multi-currency support
- [ ] Hotel and car rental integration

## Troubleshooting

### Backend not connecting
- Make sure Flask is running: `python app.py`
- Check that port 5000 is available
- Verify CORS is enabled

### No flight data showing
- Ensure `fast-flights` library is installed
- Check internet connection
- Verify airport codes are correct
- fast-flights might need updates for Google Flights structure changes

### Database errors
- Delete `price_history.db` to reset database
- Ensure write permissions in project directory

## Legal & Ethical

This project uses `fast-flights` to scrape Google Flights data. Be aware of:
- Google's Terms of Service
- Rate limiting to avoid excessive requests
- Use for personal, non-commercial purposes

## License

MIT License - Open source

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues and feature requests: https://github.com/guigalhano/flights/issues

---

**Flight Price History Tracker** - Monitor flights to/from Santiago 💰✈️
