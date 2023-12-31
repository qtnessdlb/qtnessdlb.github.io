if (window.location.pathname.endsWith('.html')) {
    var newPath = window.location.pathname.slice(0, -5);
    history.replaceState({}, document.title, newPath);
}

if (window.location.hash) {
    history.replaceState({}, document.title, window.location.pathname + window.location.search);
}

if (!window.location.hash) {

    history.replaceState({}, document.title, window.location.pathname + window.location.search + '#home');
}

document.addEventListener('click', function (event) {
    var target = event.target.closest('a');

    if (target && target.getAttribute('href').startsWith('#')) {
        event.preventDefault();

        var sectionId = target.getAttribute('href');

        window.location.hash = sectionId;

        setTimeout(function () {
            document.querySelector(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }, 50);
    }
});


// table and popup
document.addEventListener('DOMContentLoaded', function () {

    function createTableRow(user) {
        return `
            <tr>
                <td class="tbl-bx-num">${user.number}</td>
                <td class="tbl-bx-img td-usr-img"><img class="user-image" src="${user.userImage}" alt="User Image" onclick="openImagePopup('${user.userImage}')"></td>
                <td class="tbl-bx-txt td-usr-name">${user.username}</td>
                <td class="tbl-bx-txt td-usr-ig"><a class="instagram-link" href="https://www.instagram.com/${user.instagramUsername}" target="_blank">${user.instagramUsername}</a></td>
                <td class="tbl-bx-txt td-usr-desc">${user.description}</td>
            </tr>
        `;
    }

    function populateLeaderboard(data) {
        var tableBody = document.getElementById('leaderboardTable').getElementsByTagName('tbody')[0];

        tableBody.innerHTML = '';

        data.forEach(function (user) {
            tableBody.insertAdjacentHTML('beforeend', createTableRow(user));
        });
    }

    // Load leaderboard data from external file
    var script = document.createElement('script');
    script.src = './script/leaderboard.js';
    script.onload = function () {
        populateLeaderboard(leaderboardData);
    };

    document.head.appendChild(script);
});

function openImagePopup(userImage) {
    var popupContainer = document.createElement('div');
    popupContainer.className = 'image-popup';

    var popupContent = document.createElement('div');
    popupContent.className = 'popup-content';

    var fullImage = document.createElement('img');
    fullImage.src = userImage;
    fullImage.alt = 'Popup Image';
    fullImage.className = 'popup-image';

    popupContent.appendChild(fullImage);
    popupContainer.appendChild(popupContent);

    document.body.appendChild(popupContainer);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when the popup is open

    // Add event listener to close the popup when clicking outside
    popupContainer.addEventListener('click', closeImagePopup);

    // Optionally, you can add a listener for the 'Escape' key to close the popup
    document.addEventListener('keydown', closeImagePopupOnEsc);
}

function closeImagePopup() {
    var popupContainer = document.querySelector('.image-popup');
    if (popupContainer) {
        document.body.removeChild(popupContainer);
        document.body.style.overflow = ''; // Re-enable scrolling when the popup is closed
    }
}

function closeImagePopupOnEsc(event) {
    if (event.key === 'Escape') {
        closeImagePopup();
    }
}

// disable right click
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});


function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

function closeModal(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal || event.target.classList.contains('close-modal')) {
        modal.style.display = 'none';
    }
}