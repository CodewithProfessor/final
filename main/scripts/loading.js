// loading.js

// Function to load an HTML component into a specified element
function loadComponent(url, elementId) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error(error);
            document.getElementById(elementId).innerHTML = `<p>Error loading content. Please try again later.</p>`;
        });
}

// Function to handle page transitions
function showPage(pageId) {
    if (pageId === 'loading-screen') {
        document.getElementById('loading-screen').style.display = 'flex';
        document.querySelector('.website-content').style.display = 'none';
        document.body.style.overflow = 'hidden'; // Disable scrolling
    } else if (pageId === 'website-content') {
        document.getElementById('loading-screen').style.display = 'none';
        document.querySelector('.website-content').style.display = 'block';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
}

// Load all components and handle the loading screen
function initializeLoading() {
    const components = [
        { url: 'main/components/loading.html', id: 'loading-screen' },
        { url: 'main/components/header.html', id: 'header' },
        { url: 'main/components/hero.html', id: 'hero' },
        { url: 'main/components/features.html', id: 'features' },
        { url: 'main/components/footer.html', id: 'footer' },
    ];

    // Load all components
    Promise.all(components.map(component => loadComponent(component.url, component.id)))
        .then(() => {
            // Show loading screen first
            showPage('loading-screen');

            // Simulate loading delay (e.g., 3 seconds)
            setTimeout(() => {
                // After loading, show the website content
                showPage('website-content');
            }, 3000);
        })
        .catch(error => {
            console.error('Error loading components:', error);
            document.getElementById('loading-screen').innerHTML = '<p>Failed to load content. Please refresh the page or try again later.</p>';
        });
}

// Initialize loading when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeLoading);
