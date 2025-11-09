document.addEventListener('DOMContentLoaded', doAll);

function doAll() {
    // реализация выпадающего меню
    let elem = document.querySelector('.navigation ul');
    elem.addEventListener("click", function (event) {
        if (event.target.textContent == 'Мои интересы') {
            event.preventDefault();
            if (event.button == 0) {
                console.log("сработало 1е условие");
                if (event.target.nextElementSibling.className == 'content-navigation show' &&
                    document.querySelector(".navigation .active").textContent != 'Мои интересы') {
                    window.location.href = "interests.html";
                }
                document.querySelector(".content-navigation").classList.toggle("show");
            }
        }
    });

    // Реализация отображения даты
    let date = document.createElement('div');
    date.className = "date"; 
    document.body.firstElementChild.append(date);

    let currentDate = new Date();
    date.innerHTML = `<p>ЧЧ=${currentDate.getHours()}, ${getMonth(currentDate.getMonth())}, ${currentDate.getFullYear()} г.</p>`;

    setInterval(showDate, 1000);

    // Реализация куки
    pageView();
    
    if (window.location.pathname.includes('cookie.html')) {
        displayViewHistory();
    }
}

function showDate() {
    let date = document.querySelector('.date');
    let currentDate = new Date();
    date.innerHTML = `<p>ЧЧ=${currentDate.getHours()}, ${getMonth(currentDate.getMonth())}, ${currentDate.getFullYear()} г.</p>`;
}

function getMonth(number) {
    switch(number) {
        case 0: return "Январь";
        case 1: return "Февраль";
        case 2: return "Март";
        case 3: return "Апрель";
        case 4: return "Май";
        case 5: return "Июнь";
        case 6: return "Июль";
        case 7: return "Август";
        case 8: return "Сентябрь";
        case 9: return "Октябрь";
        case 10: return "Ноябрь";
        case 11: return "Декабрь";
    }
}

function hideMenu() {
    document.querySelector(".content-navigation").classList.toggle("show");
}

function getCookie(name) {
    for(let cookie of document.cookie.split(';')) {
        let cookiesName = cookie.split('=')[0];
        let cookiesValue = cookie.split('=')[1];
        if(cookiesName == name) {
            return decodeURIComponent(cookiesValue);
        }
    }
    return null;
}

function setCookie(name, value, expiration_days) {
    const date = new Date();
    date.setTime(date.getTime() + (expiration_days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}
function pageView() {
    const pageName = window.location.pathname.split('/').pop() || 'index.html';
    const timestamp = new Date().toISOString();
    
    saveToSessionStorage(pageName, timestamp);
    
    saveToCookies(pageName, timestamp, 35);
}

function saveToSessionStorage(pageName, timestamp) {
    let sessionHistory = JSON.parse(sessionStorage.getItem('sessionHistory') || '{}');
    
    if (!sessionHistory[pageName]) {
        sessionHistory[pageName] = {
            count: 0,
            lastVisit: ''
        };
    }
    
    sessionHistory[pageName].count++;
    sessionHistory[pageName].lastVisit = timestamp;
    
    sessionStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
}

function saveToCookies(pageName, timestamp, expiration_days) {
    let cookieHistory = getCookie('pageHistory');
    let history = {};
    
    if (cookieHistory) {
        try {
            history = JSON.parse(cookieHistory);
        } catch (e) {
            history = {};
        }
    }
    
    if (!history[pageName]) {
        history[pageName] = {
            count: 0,
            lastVisit: ''
        };
    }
    
    history[pageName].count++;
    history[pageName].lastVisit = timestamp;
    
    setCookie('pageHistory', JSON.stringify(history), expiration_days);
}

function getSessionHistory() {
    return JSON.parse(sessionStorage.getItem('sessionHistory') || '{}');
}

function getAllTimeHistory() {
    const cookieHistory = getCookie('pageHistory');
    if (cookieHistory) {
        try {
            return JSON.parse(cookieHistory);
        } catch (e) {
            return {};
        }
    }
    return {};
}

function displayViewHistory() {
    const sessionHistory = getSessionHistory();
    const allTimeHistory = getAllTimeHistory();

    displaySessionHistory(sessionHistory);
    displayAllTimeHistory(allTimeHistory);
}

function displaySessionHistory(history) {
    const tableBody = document.getElementById('sessionHistoryTableBody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (Object.keys(history).length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">Нет данных за текущий сеанс</td></tr>';
        return;
    }
    
    const sortedPages = Object.entries(history).sort((a, b) => b[1].count - a[1].count);
    
    sortedPages.forEach(([pageName, data]) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${getPageDisplayName(pageName)}</td>
            <td>${data.count}</td>
            <td>${formatDate(data.lastVisit)}</td>
        `;
        
        tableBody.appendChild(row);
    });
}


function displayAllTimeHistory(history) {
    const tableBody = document.getElementById('allTimeHistoryTableBody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (Object.keys(history).length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">Нет данных за все время</td></tr>';
        return;
    }
    

    const sortedPages = Object.entries(history).sort((a, b) => b[1].count - a[1].count);
    
    sortedPages.forEach(([pageName, data]) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${getPageDisplayName(pageName)}</td>
            <td>${data.count}</td>
            <td>${formatDate(data.lastVisit)}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

function getPageDisplayName(pageName) {
    const pageNames = {
        'mainPage.html': 'Главная',
        'aboutMe.html': 'Обо мне',
        'interests.html': 'Мои интересы',
        'study.html': 'Учеба',
        'photoAlbum.html': 'Фотоальбом',
        'contact.html': 'Контакт',
        'test.html': 'Тест',
        'cookie.html': 'История просмотров'
    };
    
    return pageNames[pageName] || pageName;
}

function formatDate(dateString) {
    if (!dateString) return 'Никогда';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
}


function clearSessionHistory() {
    sessionStorage.removeItem('sessionHistory');
    displayViewHistory();
}

function clearAllHistory() {
    sessionStorage.removeItem('sessionHistory');
        setCookie('pageHistory', '', -1);
        displayViewHistory();
}