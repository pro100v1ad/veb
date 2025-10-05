/* jshint esversion: 6 */
function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if(errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

function hideError(elementId) {
    const errorEl = document.getElementById(elementId);
    if(errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }
}

function isEmpty(value) {
    return value === null || value === undefined || value.toString().trim() === '';
}

function validateContactForm() {

    clearContactErrors();

    // ФИО
    const fullname = document.getElementById('fullname').value;
    if(isEmpty(fullname)) {
        showError('fullnameError', 'Поле ФИО обязательно для заполнения');
        document.getElementById('fullname').focus();
        return;
    } else {
        if(!checkFullNameField(fullname)) {
            showError('fullnameError', 'Ошибка при вводе ФИО');
            document.getElementById('fullname').focus();
            return;
        }
    } 

    // Номер телефона
    const phone = document.getElementById('phone').value;
    if(isEmpty(phone)) {
        showError('phoneError', 'Поле номер телефона обязательно для заполнения');
        document.getElementById('phone').focus();
        return;
    } else {
        if(!validatePhoneNumberField(phone)) {
            document.getElementById('phone').focus();
            return;
        }
    }

    // Гендер
    const gender = document.querySelector('input[name="gender"]:checked');
    if(!gender) {
        showError('genderError', 'Выберите пол');
        document.querySelector('input[name="gender"]').focus();
        return;
    }

    // Возраст
    const age = document.getElementById("age").value;
    if(isEmpty(age)) {
        showError('ageError', 'Выберите возраст');
        document.getElementById('age').focus();
        return;
    }

    // Email
    const email = document.getElementById('email').value;
    if(isEmpty(email)) {
        showError('emailError', 'Поле email обязательно для заполнения');
        document.getElementById('email').focus();
        return;
    }

    // Сообщение
    const message = document.getElementById('message').value;
    if(isEmpty(message)) {
        showError('messageError', 'Поле сообщения обязательно для заполнения');
        document.getElementById('message').focus();
        return;
    }

    alert('Форма успешно отправлена!');

}

function validateTestForm() {
    clearTestErrors();

    // ФИО
    const fullname = document.getElementById('fullname').value;
    if(isEmpty(fullname)) {
        showError('fullnameError', 'Поле ФИО обязательно для запполнения');
        document.getElementById('fullname').focus();
        return;
    }

    // Группа
    const group = document.getElementById("group").value;
    if(isEmpty(group)) {
        showError('groupError', 'Выберите группу');
        document.getElementById('group').focus();
        return;
    }

    // Вопроса 1
    const q1 = document.getElementById('q1').value;
    if(isEmpty(q1)) {
        showError('q1Error', 'Ответ на вопрос 1 обязателен');
        document.getElementById('q1').focus();
        return;
    } else {
        if(!validateQ1Field(q1)) {
            document.getElementById('q1').focus();
            return;
        }
    }

    // Вопроса 2
    const q2 = document.querySelectorAll('input[name="q2"]:checked');
    if (q2.length === 0) {
        showError('q2Error', 'Выберите хотя бы один вариант ответа');
        document.querySelector('input[name="q2"]').focus();
        return;

    }

    // Вопрос 3
    const q3 = document.getElementById('q3').value;
    if(isEmpty(q3)) {
        showError('q3Error', 'Выберите ответ на вопрос 3');
        document.getElementById('q3').focus();
        return;
    }

    clearTestErrors();

    alert("Ответ отправлен");

}

function checkFullNameField(value) {
    const words = value.trim().split(/\s+/);

    if(words.length != 3) {
        return false;
    }

    return true;
}

function validatePhoneNumberField(phone) {

    phone = phone.trim();
    // Содержит ли +7 или +3
    if(phone.substring(0, 2) !== '+7' && phone.substring(0, 2) !== '+3') {
        showError('phoneError', 'Номер должен начинаться с +7 или +3');
        return false;
    }

    // Содержит ли пробелы
    if(phone.includes(' ')) {
        showError('phoneError', 'Номер не должен содержать пробелы');
        return false;
    }

    if(!/^\d+$/.test(phone.substring(1))) {
        showError('phoneError', 'Номер должен состоять из цифр');
        return false;
    }

    if(phone.length <= 10 || phone.length > 12) {
        showError('phoneError', 'Неправильная длина номера');
        return false;
    }

    return true;
}

function validateQ1Field(value) {
    let words = value.trim().split(/\s+/);
    if(words.length > 30) {
        showError('q1Error', 'Слишком много слов');
        return false;
    }

    return true;

}

function clearContactErrors() {
    hideError('fullnameError');
    hideError('phoneError');
    hideError('genderError');
    hideError('ageError');
    hideError('emailError');
    hideError('messageError');
}

function clearTestErrors() {
    hideError('fullnameError');
    hideError('groupError');
    hideError('q1Error');
    hideError('q2Error');
    hideError('q3Error');
}