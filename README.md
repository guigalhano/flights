# Santiago Flights Monitor

A real-time flight monitoring dashboard for Comodoro Arturo Merino Benítez International Airport (SCL) in Santiago, Chile.

## Features

### Dashboard Views

- **Arrivals Tab**: Monitor all incoming flights to Santiago with real-time status updates
- **Departures Tab**: Track all outgoing flights from Santiago with departure information  
- **Statistics Tab**: View comprehensive analytics about flight operations

### Key Capabilities

- Search and filter flights by number, airline, or city
- Real-time statistics (arrivals, departures, on-time rate, delays)
- Time display in Santiago timezone (CLT)
- Responsive design for desktop, tablet, and mobile
- Dark mode support

## Flight Information

For each flight, the dashboard displays:
- Flight number and airline
- Origin and destination cities
- Scheduled and estimated times
- Current status (On Time, Delayed, Boarding, Landed)
- Gate assignment

## Technical Stack

- HTML5, CSS3, JavaScript (ES6+)
- Responsive CSS Grid and Flexbox
- Real-time updates with JavaScript intervals

## Getting Started

### Prerequisites
- A modern web browser

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/guigalhano/flights.git
cd flights
```

2. Open the dashboard:
```bash
# Option 1: Direct file open
open index.html

# Option 2: Local server (Python 3)
python -m http.server 8000

# Option 2: Local server (Node.js)
npx http-server
```

3. Navigate to http://localhost:8000 in your browser

## Project Structure

```
flights/
├── index.html          # Main dashboard
├── css/
│   └── style.css      # Styling
├── js/
│   ├── app.js         # Main logic
│   └── data.js        # Flight data
└── README.md
```

## Features Explained

### Search & Filter
Search flights by:
- Flight number (e.g., "LA501")
- Airline name (e.g., "LATAM")
- City name (e.g., "Santiago")

### Auto-refresh
- Flight data refreshes every 30 seconds
- Time updates every second

## Flight Statuses

- **On Time** (Green): Flight operating as scheduled
- **Delayed** (Orange): Flight experiencing delays
- **Boarding** (Blue): Currently boarding passengers
- **Landed** (Gray): Flight has completed arrival

## Browser Support

- Chrome/Chromium: Full support
- Firefox: Full support  
- Safari: Full support
- Edge: Full support
- Mobile browsers: Responsive design

## Future Enhancements

- Live flight tracking with maps
- Weather conditions integration
- Flight history and archives
- Real API integration
- Push notifications
- Export data (PDF, CSV)

## Data

Currently uses mock flight data for demonstration. Easy integration with real airport APIs.

## License

MIT License - Open source

## Contact

For issues and feature requests: https://github.com/guigalhano/flights
