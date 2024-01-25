// right click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Header & Footer
document.addEventListener('DOMContentLoaded', function () {
    const headerPath = window.innerWidth < 450 ? '/components/mobile-header.html' : '/components/header.html';

    // header
    fetch(headerPath)
        .then(response => response.text())
        .then(html => {
            document.getElementById('mainHeader').innerHTML = html;
            document.addEventListener('scroll', function () {
                const header = document.getElementById('mainHeader');
                const scrollPosition = window.scrollY;
                if (scrollPosition > 50) {
                    header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    header.style.backdropFilter = 'blur(5px)';
                } else {
                    header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                    header.style.backdropFilter = 'blur(0px)';
                }
            });
        })
        .catch(error => console.error('Error loading header:', error));

    // footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('mainFooter').innerHTML = html;
        })
        .catch(error => console.error('Error loading footer:', error));
});

window.addEventListener('resize', function () {
    const headerPath = window.innerWidth < 450 ? '/components/mobile-header.html' : '/components/header.html';

    fetch(headerPath)
        .then(response => response.text())
        .then(html => {
            document.getElementById('mainHeader').innerHTML = html;
        })
        .catch(error => console.error('Error loading header:', error));
});

// clean link
// if (window.location.pathname.endsWith('.html')) {
//     var newPath = window.location.pathname.replace(/\.html$/, '');
//     history.replaceState({}, '', newPath);
//     document.title = document.title.replace(/\.html$/, '');
// }

// if (window.location.pathname.endsWith('/')) {
//     var newPath = window.location.pathname.slice(0, -1);
//     history.replaceState({}, '', newPath);
// }

// tabing
$(document).ready(function() {
    var tabArea = "ul.tab-area li.tab-link",
        tabContent = '.tab-content';

    // Find the first tab-link with the class 'ongoing' and make it active
    var ongoingTab = $(tabArea + '.ongoing');
    if (ongoingTab.length > 0) {
        ongoingTab.addClass('active');
        var tabIndex = ongoingTab.index();
        ongoingTab.parent('ul').next(".tab-wrap")
            .find(tabContent).eq(tabIndex).addClass('active');
    } else {
        // If no tab-link has the class 'ongoing', make the first one active
        $(tabArea + ':first-child').addClass('active');
        $(tabContent + ':first-child').addClass('active');
    }

    // Handle tab-link click event
    $(tabArea).on('click', function() {
        var tabIndex = $(this).index();
        $(tabArea).removeClass('active');
        $(tabContent).removeClass('active');
        $(this).addClass('active');
        $(this).parent('ul').next(".tab-wrap")
            .find(tabContent).eq(tabIndex).addClass('active');
    });
});


// sound handler



// mobile
$(document).ready(function() {
    $(document).on("click", ".toggle-button", function() {
        console.log("Button clicked!");
        var $navigasiMobile = $(".navigasi-mobile");
        var $mobileHeaderContent = $(".mobile-header-content");

        // Toggle class to activate/deactivate the menu
        $navigasiMobile.toggleClass("active");

        // Check if .navigasi-mobile is active
        var isActive = $navigasiMobile.hasClass("active");

        // Set the height and overflow based on conditions
        $navigasiMobile.css("height", isActive ? "fit-content" : "none");
        $mobileHeaderContent.css({
            "max-height": isActive ? "70vh" : "none",
            "overflow-y": isActive && $mobileHeaderContent[0].scrollHeight > 90 ? "auto" : "hidden"
        });
    });
});


// download file handler
function createDownloadItem(item) {
    const downloadItem = document.createElement('a');
    downloadItem.href = item.link;
    downloadItem.className = 'download-box';

    downloadItem.innerHTML = `
        <i class="ti ti-cloud-download" id="downloadicon"></i>
        <div class="download-box-wrap">
            <h4 class="title" id="title-download">${item.title}</h4>
            <h5 class="title-2" id="desc-download">${item.description}</h5>
            <p class="desc" id="author-download">${item.author}</p>
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
    const pageCtnWrap = downloadSection.querySelector('.download-wrap');

    data.forEach(item => {
        const downloadItem = createDownloadItem(item);
        pageCtnWrap.appendChild(downloadItem);
    });
}

function filterDownloadItems(searchText) {
    const downloadSection = document.getElementById('download');
    const pageCtnWrap = downloadSection.querySelector('.download-wrap');
    const downloadItems = pageCtnWrap.querySelectorAll('.download-box');

    downloadItems.forEach(item => {
        const title = item.querySelector('#title-download').textContent.toLowerCase();
        const description = item.querySelector('#desc-download').textContent.toLowerCase();
        const author = item.querySelector('#author-download').textContent.toLowerCase();
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


// leaderboarddata handler
function createLeaderboardCardHTML(data) {
    return `
        <a href="#" class="lb-card">
            <img src="${data.imgSrc}" alt="user-img" class="lb-user-img">
            <div class="lb-author">
                <h4 class="title">${data.userName}</h4>
                <p class="lb-user-social-link">${data.socialLink}</p>
            </div>
            <div class="lb-point-group">
                <span class="lb-point"><i class="ri-star-s-fill"></i>${data.points} Point</span>
                <p class="lb-user-desc">${data.userDesc} <span class="lb-task-counter">${data.taskCounter}</span></p>
            </div>
        </a>`;
}

// Function to append a leaderboard card to the container
function appendLeaderboardCard(container, data) {
    var cardHTML = createLeaderboardCardHTML(data);
    container.innerHTML += cardHTML;
}

// Load data asynchronously after the DOM has been fully loaded
document.addEventListener('DOMContentLoaded', function () {
    loadData();
});

// Load data asynchronously
async function loadData() {
    try {
        // Fetch data from external file
        var response = await fetch('/dataleaderboard.js');
        var data = await response.json();

        // Get the container
        var cardContainer = document.getElementById('leaderboard-card-group');

        // Loop through the data and append leaderboard cards
        data.leaderboardData.forEach(item => {
            appendLeaderboardCard(cardContainer, item);
        });
    } catch (error) {
        console.error('Error loading data:', error);
    }
}