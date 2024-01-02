// Remove .html extension from the URL
if (window.location.pathname.endsWith('.html')) {
	var newPath = window.location.pathname.slice(0, -5);
	history.replaceState({}, document.title, newPath);
}

// Handle button click to change the page without modifying the URL
document.addEventListener('click', function (event) {
	var target = event.target;

	// Check if the clicked element is a navigation link
	if (target.tagName === 'A' && target.getAttribute('href').startsWith('#page-')) {
		event.preventDefault(); // Prevent default link behavior

		// Get the target section id (e.g., #page-1)
		var sectionId = target.getAttribute('href');

		// Change the page without modifying the URL
		history.pushState({}, document.title, window.location.pathname + sectionId);

		// Scroll to the target section
		document.querySelector(sectionId).scrollIntoView({
			behavior: 'smooth'
		});
	}
});