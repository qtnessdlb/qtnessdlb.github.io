    // Remove .html extension from the URL
    if (window.location.pathname.endsWith('.html')) {
        var newPath = window.location.pathname.slice(0, -5);
        history.replaceState({}, document.title, newPath);
    }

    // Check if there's a hash in the URL
    if (window.location.hash) {
        // If there's a hash, set the default hash to an empty string
        history.replaceState({}, document.title, window.location.pathname + window.location.search);
    }

    // Check if there's no hash in the URL
    if (!window.location.hash) {
        // Set the default hash to #home
        history.replaceState({}, document.title, window.location.pathname + window.location.search + '#home');
    }

    // Handle button click to change the page without modifying the URL
    document.addEventListener('click', function (event) {
        var target = event.target.closest('a'); // Find the nearest ancestor A element

        // Check if the clicked element is a navigation link
        if (target && target.getAttribute('href').startsWith('#')) {
            event.preventDefault(); // Prevent default link behavior

            // Get the target section id (e.g., #home)
            var sectionId = target.getAttribute('href');

            // Change the page without modifying the URL
            window.location.hash = sectionId;

            // Scroll to the target section after a short delay
            setTimeout(function () {
                document.querySelector(sectionId).scrollIntoView({
                    behavior: 'smooth'
                });
            }, 50);
        }
    });