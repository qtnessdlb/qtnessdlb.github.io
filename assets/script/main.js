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

if (window.location.pathname.endsWith('/')) {
    var newPath = window.location.pathname.slice(0, -1);
    history.replaceState({}, '', newPath);
}

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

// cdEvent handler
class Countdown {
    constructor(el){
      this.el = el;
      this.targetDate = new Date(el.getAttribute("date-time"));
      this.createCountDownParts()
      this.countdownFunction();
      this.countdownLoopId = setInterval(this.countdownFunction.bind(this), 1000)
    }
    createCountDownParts(){
      ["hari", "jam", "menit", "detik"].forEach(part => {
        const partEl = document.createElement("div");
        partEl.classList.add("part", part);
        const textEl = document.createElement("div");
        textEl.classList.add("text");
        textEl.innerText = part;
        const numberEl = document.createElement("div");
        numberEl.classList.add("number");
        numberEl.innerText = 0;
        partEl.append(numberEl, textEl);
        this.el.append(partEl);
        this[part] = numberEl;
      })
    }
  
    countdownFunction(){
      const currentDate = new Date();    
      if(currentDate > this.targetDate) return clearInterval(this.intervalId);
      const remaining = this.getRemaining(this.targetDate, currentDate);
      Object.entries(remaining).forEach(([part,value]) => {
        this[part].style.setProperty("--value", value)
        this[part].innerText = value
      })  
    }
    
    getRemaining(target, now){
      let detik = Math.floor((target - (now))/1000);
      let menit = Math.floor(detik/60);
      let jam = Math.floor(menit/60);
      let hari = Math.floor(jam/24);
      jam = jam-(hari*24);
      menit = menit-(hari*24*60)-(jam*60);
      detik = detik-(hari*24*60*60)-(jam*60*60)-(menit*60);
      return { hari, jam, menit, detik }      
    }
  
  }
  
  const countdownEls= document.querySelectorAll(".countdown") || [];
  countdownEls.forEach(countdownEl => new Countdown(countdownEl))
  




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
            <p class="desc" id="author-download">${item.author} - ${item.source}</p>
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

// leaderboarddata handler
document.addEventListener('DOMContentLoaded', function () {
    appendDownloadItems(downloadData);
    loadLeaderboard();
});

const script = document.createElement('script');
script.src = '/assets/script/dataleaderboard.js';
script.onload = function () {
    loadLeaderboard();
};
document.head.appendChild(script);

function loadLeaderboard() {
    var leaderboardCardGroup = document.getElementById("leaderboard-card-group");

    if (!leaderboardCardGroup) {
        console.error("Element with id 'leaderboard-card-group' not found.");
        return;
    }

    var fragment = document.createDocumentFragment();

    users.forEach(function (user) {
        var userHtml = `
            <a target="_blank" href="//${user.socialLink}/${user.username}" class="lb-card" id="leaderboard-card">
                <img src="${user.imageUrl}" alt="user-img" class="lb-user-img">
                <div class="lb-author">
                    <h4 class="title" id="lb-user-name">${user.name}</h4>
                    <p class="lb-user-social-link">@${user.username}</p>
                </div>
                <div class="lb-point-group">
                    <span class="lb-point"><i class="ri-star-s-fill"></i>${user.points} Point</span>
                    <p class="lb-user-desc">${user.phaseProgress} <span class="lb-task-counter">${user.completedTasks} / ${user.goingTasks}</span></p>
                </div>   
            </a>
        `;

        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = userHtml;

        while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild);
        }
    });

    leaderboardCardGroup.appendChild(fragment);
}