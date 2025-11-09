const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const nameOfDayOfWeek = (year, month, day) => new Date(year, month, day).getDay();
let currentMonth;
let currentYear;

let nameOfMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

let nameOfDaysOfWeeks = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

document.addEventListener("DOMContentLoaded", function () {
    let inputDate = document.getElementById('date');
    inputDate.onblur = function(event) {
        validateDateOfBirthField();
        setTimeout(() => {
        if (!event.relatedTarget || !event.relatedTarget.closest('.calendar')) {
            document.querySelector('.calendar')?.classList.remove('show');
        }
    }, 100);
        
    }

    
    inputDate.onfocus = function(event) {
        if(document.querySelector('.calendar') == null) {
            calendar();
        } else if (document.querySelector('.calendar').className != 'calendar show') {
            calendar();
        }      
        event.stopPropagation();
    }

});

document.addEventListener('click', function(event) {
    if (!event.target.closest('.calendar') && !event.target.closest('#date')) {
        document.querySelector('.calendar')?.classList.remove('show');
    }
});

function createCalendar(calendar) {
    let data = new Date();

    currentMonth = data.getMonth() + 1;
    currentYear = data.getFullYear();

    // Создание "Месяц Год" 
    let form = document.createElement('form');
    form.addEventListener('change', monthAndYear);
    let selectMonths = document.createElement('select');
    selectMonths.className = 'months';
    let selectYear = document.createElement('select');
    selectYear.className = 'years';

    for (let i = 0; i < 12; i++) {
        let selected = data.getMonth() == i;
        let opt = new Option(nameOfMonths[i], i, selected, selected);
        selectMonths.add(opt);
    }
    form.append(selectMonths);

    for (let i = data.getFullYear() - 100; i < data.getFullYear() + 1; i++) {
        let selected = data.getFullYear() == i;
        let opt = new Option(i, i, selected, selected);
        selectYear.add(opt);
    }
    form.append(selectYear);
    calendar.append(form);

    // Создание названий дней недель
    let nameOfDaysOfWeeksContainer = document.createElement('div');
    nameOfDaysOfWeeksContainer.className = 'nameOfdays';
    nameOfDaysOfWeeks.forEach(function (entry) {
        let day = document.createElement('div');
        day.innerHTML = `<p>${entry}</p>`;
        nameOfDaysOfWeeksContainer.append(day);
    });
    calendar.append(nameOfDaysOfWeeksContainer);

    // Создание самих дней
    createDaysContainer(calendar, data.getFullYear(), data.getMonth());

}

function createDaysContainer(calendar, year, month) {
    let countsOfDays = daysInMonth(year, month);
    let firstDayOfWeek = nameOfDayOfWeek(year, month, 0);

    let daysContainer = document.createElement('div');
    daysContainer.className = 'days';
    daysContainer.addEventListener('click', days);

    for (let i = 0; i < firstDayOfWeek; i++) {
        let day = document.createElement('div');
        day.innerHTML = `<p>#</p>`;
        daysContainer.append(day);
    }

    for (let i = 1; i <= countsOfDays; i++) {
        let day = document.createElement('div');
        day.innerHTML = `<p>${i}</p>`;
        daysContainer.append(day);
    }

    calendar.append(daysContainer);
}

function days(event) {
    let inputDate = document.getElementById('date');
    setDate(inputDate, event.target.textContent, currentMonth, currentYear);
    event.stopPropagation();
    hideError('dateError');
    markFieldValid('date');
    document.querySelector('.calendar').classList.remove('show');
    document.getElementById('date').blur();
}

function monthAndYear(event) {
    let form = event.currentTarget;
    let selectYear = form.querySelector('.years');
    let selectMonths = form.querySelector('.months');

    let chooseYear = parseInt(selectYear.value);
    let chooseMonth = parseInt(selectMonths.value);

    updateDays(chooseYear, chooseMonth);
}

function updateDays(year, month) {

    currentMonth = month + 1;
    currentYear = year;

    let calendar = document.querySelector('.calendar');
    let daysContainer = calendar.querySelector('.days');

    daysContainer.innerHTML = '';

    let countsOfDays = daysInMonth(year, month);
    let firstDayOfWeek = nameOfDayOfWeek(year, month, 0);

    for (let i = 0; i < firstDayOfWeek; i++) {
        let day = document.createElement('div');
        day.innerHTML = `<p>#</p>`;
        daysContainer.append(day);
    }

    for (let i = 1; i <= countsOfDays; i++) {
        let day = document.createElement('div');
        day.innerHTML = `<p>${i}</p>`;
        daysContainer.append(day);
    }
}

function calendar() {
    let calendar = document.querySelector('.calendar');
    if (calendar == null) {
        let node = document.querySelector('.contact');
        calendar = document.createElement('div');
        calendar.className = 'calendar';
        node.insertAdjacentElement('beforeend', calendar);
        createCalendar(calendar);
    }
    calendar.classList.toggle('show');
}

function setDate(input, day, month, year) {
    if (day < 0 && month < 0 && year < 0) return;
    if(day.charAt(0) == '#' || day.length > 2) return;
    if(day.length == 1) day = '0' + day;
    if(month.toString().length == 1) month = '0' + month.toString();
    input.value = `${day}.${month}.${year}`;
}