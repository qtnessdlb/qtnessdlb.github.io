    // Remove .html extension from the URL
    if (window.location.pathname.endsWith('.html')) {
        var newPath = window.location.pathname.slice(0, -5);
        history.replaceState({}, document.title, newPath);
    }

    // Check if there's a hash in the URL
    if (!window.location.hash) {
        // If no hash, set the default hash to #home
        history.replaceState({}, document.title, window.location.pathname + window.location.search + '#home');
    }

    // Handle button click to change the page without modifying the URL
    document.addEventListener('click', function (event) {
        var target = event.target;

        // Check if the clicked element is a navigation link
        if (target.tagName === 'A' && target.getAttribute('href').startsWith('#')) {
            event.preventDefault(); // Prevent default link behavior

            // Get the target section id (e.g., #home)
            var sectionId = target.getAttribute('href');

            // Construct the new URL without the fragment identifier (#)
            var newUrl = window.location.pathname + window.location.search + sectionId;

            // Change the page without modifying the URL
            history.pushState({}, document.title, newUrl);

            // Scroll to the target section
            document.querySelector(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });