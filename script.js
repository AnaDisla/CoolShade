// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fade in animation on scroll
    const fadeElems = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => observer.observe(elem));

    // Initialize charts
    initializeCharts();
    
    // Update last update time
    updateLastUpdateTime();
});

// Initialize charts with dummy data
function initializeCharts() {
    // Temperature and Humidity Chart
    const tempHumCtx = document.getElementById('tempHumChart').getContext('2d');
    new Chart(tempHumCtx, {
        type: 'line',
        data: {
            labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
            datasets: [
                {
                    label: 'Temperatura (°C)',
                    data: [25, 26, 27, 28, 27, 26],
                    borderColor: '#16424a',
                    tension: 0.4
                },
                {
                    label: 'Humedad (%)',
                    data: [45, 44, 42, 40, 41, 43],
                    borderColor: '#8b7355',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Air Quality Chart
    const airQualityCtx = document.getElementById('airQualityChart').getContext('2d');
    new Chart(airQualityCtx, {
        type: 'bar',
        data: {
            labels: ['CO₂', 'PM2.5', 'PM10', 'VOC'],
            datasets: [{
                label: 'Niveles actuales',
                data: [400, 12, 25, 150],
                backgroundColor: '#16424a',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = formattedTime;
}

// Download data as CSV
function downloadData() {
    // Dummy data for demonstration
    const csvContent = `Timestamp,Temperature,Humidity,CO2,PM2.5,PM10,VOC
2023-10-05 12:00:00,25,45,400,12,25,150
2023-10-05 13:00:00,26,44,410,11,24,155
2023-10-05 14:00:00,27,42,405,13,26,148
2023-10-05 15:00:00,28,40,415,12,25,152
2023-10-05 16:00:00,27,41,408,11,24,149
2023-10-05 17:00:00,26,43,402,12,25,151`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'coolshade_data.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    const formData = {
        nombre: e.target.nombre.value,
        email: e.target.email.value,
        mensaje: e.target.mensaje.value
    };
    
    // For demonstration, just show an alert
    alert('Gracias por tu mensaje. Te contactaremos pronto.');
    e.target.reset();
});