
const FLIGHTS_DATA = {
    arrivals: [
        {
            flightNumber: 'LA501',
            airline: 'LATAM',
            airlineCode: 'LATAM',
            origin: 'MEX',
            originCity: 'Mexico City',
            destination: 'SCL',
            destinationCity: 'Santiago',
            scheduledTime: '10:30',
            estimatedTime: '10:45',
            actualTime: null,
            status: 'DELAYED',
            gate: 'A12',
            aircraft: 'B787',
            distance: 2100,
            duration: '4h 45m'
        },
        {
            flightNumber: 'IB6845',
            airline: 'Iberia',
            airlineCode: 'IBE',
            origin: 'MAD',
            originCity: 'Madrid',
            destination: 'SCL',
            destinationCity: 'Santiago',
            scheduledTime: '11:15',
            estimatedTime: '11:15',
            actualTime: null,
            status: 'ON_TIME',
            gate: 'B05',
            aircraft: 'A350',
            distance: 9300,
            duration: '12h 30m'
        },
        {
            flightNumber: 'AF456',
            airline: 'Air France',
            airlineCode: 'AFR',
            origin: 'CDG',
            originCity: 'Paris',
            destination: 'SCL',
            destinationCity: 'Santiago',
            scheduledTime: '12:00',
            estimatedTime: '12:15',
            actualTime: null,
            status: 'DELAYED',
            gate: 'C08',
            aircraft: 'A380',
            distance: 9700,
            duration: '13h 15m'
        },
        {
            flightNumber: 'DLH782',
            airline: 'Lufthansa',
            airlineCode: 'DLH',
            origin: 'FRA',
            originCity: 'Frankfurt',
            destination: 'SCL',
            destinationCity: 'Santiago',
            scheduledTime: '13:30',
            estimatedTime: '13:30',
            actualTime: null,
            status: 'ON_TIME',
            gate: 'A15',
            aircraft: 'A350',
            distance: 9400,
            duration: '12h 45m'
        }
    ],
    departures: [
        {
            flightNumber: 'LA502',
            airline: 'LATAM',
            airlineCode: 'LATAM',
            origin: 'SCL',
            originCity: 'Santiago',
            destination: 'MEX',
            destinationCity: 'Mexico City',
            scheduledTime: '09:15',
            estimatedTime: '09:25',
            actualTime: null,
            status: 'BOARDING',
            gate: 'A10',
            aircraft: 'B787',
            distance: 2100,
            duration: '4h 45m'
        },
        {
            flightNumber: 'IB6846',
            airline: 'Iberia',
            airlineCode: 'IBE',
            origin: 'SCL',
            originCity: 'Santiago',
            destination: 'MAD',
            destinationCity: 'Madrid',
            scheduledTime: '10:30',
            estimatedTime: '10:30',
            actualTime: null,
            status: 'ON_TIME',
            gate: 'B06',
            aircraft: 'A350',
            distance: 9300,
            duration: '12h 30m'
        }
    ]
};

function getStatusClass(status) {
    const statusMap = {
        'ON_TIME': 'status-on-time',
        'DELAYED': 'status-delayed',
        'BOARDING': 'status-boarding',
        'LANDED': 'status-landed'
    };
    return statusMap[status] || 'status-on-time';
}

function getStatusText(status) {
    const statusMap = {
        'ON_TIME': 'On Time',
        'DELAYED': 'Delayed',
        'BOARDING': 'Boarding',
        'LANDED': 'Landed'
    };
    return statusMap[status] || status;
}

function getAirlineInitials(airline) {
    const initials = {
        'LATAM': 'LT',
        'Iberia': 'IB',
        'Air France': 'AF',
        'Lufthansa': 'DL'
    };
    return initials[airline] || airline.substring(0, 2).toUpperCase();
}

function calculateStats() {
    const allFlights = [...FLIGHTS_DATA.arrivals, ...FLIGHTS_DATA.departures];
    const onTimeFlights = allFlights.filter(f => f.status === 'ON_TIME').length;
    const totalFlights = allFlights.length;
    const onTimeRate = totalFlights > 0 ? Math.round((onTimeFlights / totalFlights) * 100) : 0;

    return {
        arrivalCount: FLIGHTS_DATA.arrivals.length,
        departureCount: FLIGHTS_DATA.departures.length,
        onTimeRate: onTimeRate,
        avgDelay: 12,
        activeFlights: totalFlights
    };
}
