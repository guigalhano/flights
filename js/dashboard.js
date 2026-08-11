
const API_BASE = 'http://localhost:5000/api';
let priceChart = null;

document.addEventListener('DOMContentLoaded', () => {
    initializeDatePicker();
    setupEventListeners();
    updateTime();
    setInterval(updateTime, 1000);
});

function initializeDatePicker() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    document.getElementById('departureDate').value = dateStr;
}

function setupEventListeners() {
    document.getElementById('searchBtn').addEventListener('click', searchPrices);
    document.getElementById('trackBtn').addEventListener('click', trackPrices);
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchTab(e.currentTarget.dataset.tab));
    });
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = timeStr;
}

async function searchPrices() {
    const fromAirport = document.getElementById('fromAirport').value;
    const toAirport = document.getElementById('toAirport').value;
    const departureDate = document.getElementById('departureDate').value;
    
    try {
        const trendsResponse = await fetch(
            `${API_BASE}/price-trends?from=${fromAirport}&to=${toAirport}&date=${departureDate}`
        );
        const trendsData = await trendsResponse.json();
        
        const dealsResponse = await fetch(
            `${API_BASE}/cheapest-flights?from=${fromAirport}&to=${toAirport}&date=${departureDate}&limit=5`
        );
        const dealsData = await dealsResponse.json();
        
        displayPriceTrends(trendsData);
        displayBestDeals(dealsData.flights);
    } catch (error) {
        console.error('Error fetching prices:', error);
        alert('Error fetching price data. Make sure the backend is running.');
    }
}

function displayPriceTrends(data) {
    const ctx = document.getElementById('priceChart');
    
    if (!data.trends || data.trends.length === 0) {
        document.getElementById('trendsInfo').innerHTML = 
            '<p>No price data available for this route. Start tracking to collect data.</p>';
        return;
    }
    
    if (priceChart) {
        priceChart.destroy();
    }
    
    const dates = data.trends.map(t => t.date);
    const avgPrices = data.trends.map(t => t.avg_price);
    const minPrices = data.trends.map(t => t.min_price);
    const maxPrices = data.trends.map(t => t.max_price);
    
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Average Price',
                    data: avgPrices,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Min Price',
                    data: minPrices,
                    borderColor: '#059669',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    tension: 0.3,
                    fill: false
                },
                {
                    label: 'Max Price',
                    data: maxPrices,
                    borderColor: '#ef4444',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    tension: 0.3,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            }
        }
    });
}

function displayBestDeals(flights) {
    const container = document.getElementById('dealsContainer');
    
    if (!flights || flights.length === 0) {
        container.innerHTML = '<p>No flights found for this route and date.</p>';
        return;
    }
    
    container.innerHTML = flights.map(flight => `
        <div class="deal-card">
            <div>
                <div class="deal-airline">${flight.airline}</div>
                <div class="deal-details">${flight.duration_minutes} min, ${flight.stops} stops</div>
            </div>
            <div class="deal-details">
                <strong>Depart:</strong> ${flight.departure_time}
            </div>
            <div class="deal-details">
                <strong>Arrive:</strong> ${flight.arrival_time}
            </div>
            <div class="deal-price">$${flight.price}</div>
        </div>
    `).join('');
}

async function trackPrices() {
    const departureDate = document.getElementById('departureDate').value;
    
    try {
        const response = await fetch(`${API_BASE}/track-prices`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: departureDate })
        });
        
        const data = await response.json();
        alert(`Tracking started for ${departureDate}`);
    } catch (error) {
        console.error('Error starting tracking:', error);
        alert('Error starting price tracking. Make sure the backend is running.');
    }
}
