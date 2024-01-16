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

// download section
function createDownloadItem(item) {
    const downloadItem = document.createElement('a');
    downloadItem.href = item.link;
    downloadItem.className = 'page-ctn-download-box';

    downloadItem.innerHTML = `
        <i class="ti ti-cloud-download" id="downloadicon"></i>
        <div class="page-ctn-download-box-wrapper">
            <h2 class="page-ctn-title-download">${item.title}</h2>
            <p class="page-ctn-desc-download">${item.description}</p>
            <p class="page-ctn-author-download">${item.author}</p>
        </div>
        <span class="page-ctn-size-download">${item.size}</span>
    `;
  
    if (item.ispremium === 'true') {
        downloadItem.classList.add('premium-download');
        downloadItem.innerHTML += '<span class="premium-label">Premium</span>';
    }

    return downloadItem;
}

function appendDownloadItems(data) {
    const downloadSection = document.getElementById('download');
    const pageCtnWrap = downloadSection.querySelector('.page-ctn-wrap');

    data.forEach(item => {
        const downloadItem = createDownloadItem(item);
        pageCtnWrap.appendChild(downloadItem);
    });
}

function filterDownloadItems(searchText) {
    const downloadSection = document.getElementById('download');
    const pageCtnWrap = downloadSection.querySelector('.page-ctn-wrap');
    const downloadItems = pageCtnWrap.querySelectorAll('.page-ctn-download-box');

    downloadItems.forEach(item => {
        const title = item.querySelector('.page-ctn-title-download').textContent.toLowerCase();
        const description = item.querySelector('.page-ctn-desc-download').textContent.toLowerCase();
        const author = item.querySelector('.page-ctn-author-download').textContent.toLowerCase();
        const shouldShow = title.includes(searchText.toLowerCase()) || description.includes(searchText.toLowerCase()) || author.includes(searchText.toLowerCase());
        item.style.display = shouldShow ? 'block' : 'none';
    });
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
    const searchText = this.value.trim();
    filterDownloadItems(searchText);
});

document.addEventListener('DOMContentLoaded', function () {
    appendDownloadItems(downloadData);
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
        document.body.style.overflow = '';
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