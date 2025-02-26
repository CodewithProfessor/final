document.addEventListener("DOMContentLoaded", () => {
    // Load the loading screen
    fetch('main/components/loading.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('loading-screen').innerHTML = data;
        })
        .catch(error => console.error('Error loading loading.html:', error));

    // Wait for 5 seconds before showing the content
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.querySelector('.website-content').style.display = 'block';

        // Now load the rest of the website content
        loadComponent('header', 'main/components/header.html');
        loadComponent('hero', 'main/components/hero.html');
        loadComponent('features', 'main/components/features.html');
        loadComponent('footer', 'main/components/footer.html');

    }, 5000); // 5 seconds

    // Function to load HTML components
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    }
});
