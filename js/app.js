document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    updateTime();
    renderFlights();
    renderStatistics();

    setInterval(updateTime, 1000);
    setInterval(refreshData, 30000);

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', switchTab);
    });

    document.getElementById('arrivalSearch').addEventListener('input', filterArrivals);
    document.getElementById('departureSearch').addEventListener('input', filterDepartures);
});

function initializeApp() {
    console.log('Santiago Flights Monitor initialized');
}

function updateTime() {
    const now = new Date();
    const options = {
        timeZone: 'America/Santiago',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const timeString = now.toLocaleString('en-US', options);
    document.getElementById('currentTime').textContent = timeString;
    document.getElementById('lastUpdate').textContent = timeString;

    const stats = calculateStats();
    document.getElementById('activeFlights').textContent = stats.activeFlights;
}

function switchTab(e) {
    const tabName = e.currentTarget.dataset.tab;

    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    e.currentTarget.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function renderFlights() {
    renderArrivalsList();
    renderDeparturesList();
}

function renderArrivalsList() {
    const list = document.getElementById('arrivalsList');
    if (!FLIGHTS_DATA.arrivals || FLIGHTS_DATA.arrivals.length === 0) {
        list.innerHTML = '<div class="no-results">No arrival flights found.</div>';
        return;
    }
    list.innerHTML = FLIGHTS_DATA.arrivals.map(flight => createFlightCard(flight, 'arrival')).join('');
}

function renderDeparturesList() {
    const list = document.getElementById('departuresList');
    if (!FLIGHTS_DATA.departures || FLIGHTS_DATA.departures.length === 0) {
        list.innerHTML = '<div class="no-results">No departure flights found.</div>';
        return;
    }
    list.innerHTML = FLIGHTS_DATA.departures.map(flight => createFlightCard(flight, 'departure')).join('');
}

function createFlightCard(flight, type) {
    const statusClass = getStatusClass(flight.status);
    const statusText = getStatusText(flight.status);
    const initials = getAirlineInitials(flight.airline);
    const isArrival = type === 'arrival';

    return `
        <div class="flight-card">
            <div class="flight-header">
                <div class="airline-logo">${initials}</div>
                <div>
                    <div class="flight-number">${flight.flightNumber}</div>
                    <div class="flight-airline">${flight.airline}</div>
                </div>
            </div>
            <div class="flight-route">
                <div>${isArrival ? flight.origin : flight.origin} - ${isArrival ? flight.destination : flight.destination}</div>
                <div>${isArrival ? flight.originCity : flight.originCity} to ${isArrival ? flight.destinationCity : flight.destinationCity}</div>
            </div>
            <div class="flight-times">
                <div>${isArrival ? 'Arrival' : 'Departure'}</div>
                <div class="time-value">${isArrival ? flight.estimatedTime : flight.estimatedTime}</div>
                <div>Gate: ${flight.gate}</div>
            </div>
            <div class="flight-status">
                <div class="status-badge ${statusClass}">${statusText}</div>
            </div>
        </div>
    `;
}

function filterArrivals() {
    const searchValue = document.getElementById('arrivalSearch').value.toLowerCase();
    const filtered = FLIGHTS_DATA.arrivals.filter(flight => {
        return !searchValue ||
            flight.flightNumber.toLowerCase().includes(searchValue) ||
            flight.airline.toLowerCase().includes(searchValue) ||
            flight.originCity.toLowerCase().includes(searchValue);
    });

    const list = document.getElementById('arrivalsList');
    if (filtered.length === 0) {
        list.innerHTML = '<div class="no-results">No matching flights found.</div>';
    } else {
        list.innerHTML = filtered.map(flight => createFlightCard(flight, 'arrival')).join('');
    }
}

function filterDepartures() {
    const searchValue = document.getElementById('departureSearch').value.toLowerCase();
    const filtered = FLIGHTS_DATA.departures.filter(flight => {
        return !searchValue ||
            flight.flightNumber.toLowerCase().includes(searchValue) ||
            flight.airline.toLowerCase().includes(searchValue) ||
            flight.destinationCity.toLowerCase().includes(searchValue);
    });

    const list = document.getElementById('departuresList');
    if (filtered.length === 0) {
        list.innerHTML = '<div class="no-results">No matching flights found.</div>';
    } else {
        list.innerHTML = filtered.map(flight => createFlightCard(flight, 'departure')).join('');
    }
}

function renderStatistics() {
    const stats = calculateStats();
    document.getElementById('arrivalCount').textContent = stats.arrivalCount;
    document.getElementById('departureCount').textContent = stats.departureCount;
    document.getElementById('onTimeRate').textContent = stats.onTimeRate + '%';
    document.getElementById('avgDelay').textContent = stats.avgDelay + ' min';
}

function refreshData() {
    console.log('Refreshing flight data...');
    renderFlights();
}
