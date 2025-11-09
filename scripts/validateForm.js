/* jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fullname').addEventListener('blur', validateFullNameField);
    document.getElementById('phone').addEventListener('blur', validatePhoneNumberField);
    document.getElementById('date').addEventListener('blur', validateDateOfBirthField);
    document.getElementById('age').addEventListener('blur', validateAgeField);
    document.getElementById('email').addEventListener('blur', validateEmailField);
    document.getElementById('message').addEventListener('blur', validateMessageField);
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.addEventListener('change', validateGenderField);
    });
    document.querySelector('#contactForm button[type="button"]').disabled = true;
});


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

function markFieldValid(fieldId) {
    const field = document.getElementById(fieldId);
    if(field) {
        field.classList.remove('invalid');
        field.classList.add('valid');
    }
}

function markFieldInvalid(fieldId) {
    const field = document.getElementById(fieldId);
    if(field) {
        field.classList.remove('valid');
        field.classList.add('invalid');
    }
}

function resetFieldMark(fieldId) {
    const field = document.getElementById(fieldId);
    if(field) {
        field.classList.remove('valid');
        field.classList.remove('invalid');
    }
}

function isEmpty(value) {
    return value === null || value === undefined || value.toString().trim() === '';
}

function validateFullNameField() {
    const fullname = document.getElementById('fullname');
    const value = fullname.value;
    
    if(isEmpty(value)) {
        showError('fullnameError', 'Поле ФИО обязательно для заполнения');
        markFieldInvalid('fullname');
        return false;
    } else {
        if(!checkFullNameField(value)) {
            return false;
        }
    }
    hideError('fullnameError');
    markFieldValid('fullname');
    checkFormValidity();
    return true;
}

function checkFullNameField(value) {
    const words = value.trim().split(/\s+/);

    if(words.length != 3) {
        showError('fullnameError', 'ФИО должно состоять из трех слов');
        markFieldInvalid('fullname');
        return false;
    }

    for(let word of words) {
        if(word.length === 0) {
            showError('fullnameError', 'Все части ФИО должны быть заполнены');
            markFieldInvalid('fullname');
            return false;
        }
    }

    return true;
}

function validatePhoneNumberField() {
    const phone = document.getElementById('phone');
    const value = phone.value;
    
    if(isEmpty(value)) {
        showError('phoneError', 'Поле номер телефона обязательно для заполнения');
        markFieldInvalid('phone');
        return false;
    } else {
        if(!checkPhoneNumberField(value)) {
            return false;
        }
    }
    hideError('phoneError');
    markFieldValid('phone');
    checkFormValidity();
    return true;
}

function checkPhoneNumberField(phone) {
    phone = phone.trim();
    
    if(phone.substring(0, 2) !== '+7' && phone.substring(0, 2) !== '+3') {
        showError('phoneError', 'Номер должен начинаться с +7 или +3');
        markFieldInvalid('phone');
        return false;
    }

    if(phone.includes(' ')) {
        showError('phoneError', 'Номер не должен содержать пробелы');
        markFieldInvalid('phone');
        return false;
    }

    const digitsOnly = phone.substring(1);
    for(let i = 0; i < digitsOnly.length; i++) {
        const char = digitsOnly[i];
        if(char < '0' || char > '9') {
            showError('phoneError', 'Номер должен состоять из цифр после +');
            markFieldInvalid('phone');
            return false;
        }
    }

    if(phone.length < 12 || phone.length > 15) {
        showError('phoneError', 'Неправильная длина номера');
        markFieldInvalid('phone');
        return false;
    }

    return true;
}

function validateDateOfBirthField() {
    const dateField = document.getElementById('date');
    const value = dateField.value;
    
    if(value.length < 10 || value == 'ДД.ММ.ГГГГ') {
        showError('dateError', 'Выберите дату!');
        markFieldInvalid('date');
        return false;
    } else {
        if(!checkDateOfBirthField(value)) {
            return false;
        }
    }
    hideError('dateError');
    markFieldValid('date');
    checkFormValidity();
    return true;
}

function checkDateOfBirthField(date) {
    if(date.length !== 10 || date[2] !== '.' || date[5] !== '.') {
        showError('dateError', 'Неверный формат даты');
        markFieldInvalid('date');
        return false;
    }

    const parts = date.split('.');
    if(parts.length !== 3) {
        showError('dateError', 'Неверный формат даты');
        markFieldInvalid('date');
        return false;
    }

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    if(isNaN(day) || isNaN(month) || isNaN(year)) {
        showError('dateError', 'Дата должна содержать только цифры');
        markFieldInvalid('date');
        return false;
    }

    if(day < 1 || day > 31) {
        showError('dateError', 'День должен быть от 1 до 31');
        markFieldInvalid('date');
        return false;
    }
    if(month < 1 || month > 12) {
        showError('dateError', 'Месяц должен быть от 1 до 12');
        markFieldInvalid('date');
        return false;
    }
    if(year < 1900 || year > new Date().getFullYear()) {
        showError('dateError', 'Год должен быть от 1900 до ' + new Date().getFullYear());
        markFieldInvalid('date');
        return false;
    }

    const dateObj = new Date(year, month - 1, day);
    if(dateObj.getFullYear() !== year || 
       dateObj.getMonth() !== month - 1 || 
       dateObj.getDate() !== day) {
        showError('dateError', 'Некорректная дата');
        markFieldInvalid('date');
        return false;
    }

    return true;
}

function validateGenderField() {
    const gender = document.querySelector('input[name="gender"]:checked');
    
    if(!gender) {
        showError('genderError', 'Выберите пол');
        document.querySelectorAll('input[name="gender"]').forEach(radio => {
            radio.classList.add('invalid');
            radio.classList.remove('valid');
        });
        return false;
    }
    
    hideError('genderError');
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.classList.remove('invalid');
        radio.classList.add('valid');
    });
    checkFormValidity();
    return true;
}

function validateAgeField() {
    const age = document.getElementById("age");
    const value = age.value;
    
    if(isEmpty(value)) {
        showError('ageError', 'Выберите возраст');
        markFieldInvalid('age');
        return false;
    }
    
    hideError('ageError');
    markFieldValid('age');
    checkFormValidity();
    return true;
}

function validateEmailField() {
    const email = document.getElementById('email');
    const value = email.value;
    
    if(isEmpty(value)) {
        showError('emailError', 'Поле email обязательно для заполнения');
        markFieldInvalid('email');
        return false;
    } else {
        if(!checkEmailField(value)) {
            return false;
        }
    }
    hideError('emailError');
    markFieldValid('email');
    checkFormValidity();
    return true;
}

function checkEmailField(email) {
    email = email.trim();
    
    if(email.length === 0) {
        showError('emailError', 'Email не может быть пустым');
        markFieldInvalid('email');
        return false;
    }
    
    if(email.indexOf('@') === -1) {
        showError('emailError', 'Email должен содержать @');
        markFieldInvalid('email');
        return false;
    }
    
    const parts = email.split('@');
    if(parts.length !== 2) {
        showError('emailError', 'Неверный формат email');
        markFieldInvalid('email');
        return false;
    }
    
    if(parts[0].length === 0) {
        showError('emailError', 'В email отсутствует часть до @');
        markFieldInvalid('email');
        return false;
    }
    
    if(parts[1].length === 0 || parts[1].indexOf('.') === -1) {
        showError('emailError', 'В email отсутствует доменная часть');
        markFieldInvalid('email');
        return false;
    }
    
    return true;
}

function validateMessageField() {
    const message = document.getElementById('message');
    const value = message.value;
    
    if(isEmpty(value)) {
        showError('messageError', 'Поле сообщения обязательно для заполнения');
        markFieldInvalid('message');
        return false;
    } else {
        if(!checkMessageField(value)) {
            return false;
        }
    }
    hideError('messageError');
    markFieldValid('message');
    checkFormValidity();
    return true;
}

function checkMessageField(message) {
    message = message.trim();
    
    if(message.length < 10) {
        showError('messageError', 'Сообщение должно содержать минимум 10 символов');
        markFieldInvalid('message');
        return false;
    }
    
    if(message.length > 1000) {
        showError('messageError', 'Сообщение не должно превышать 1000 символов');
        markFieldInvalid('message');
        return false;
    }
    
    return true;
}

function checkFormValidity() {
    const submitButton = document.querySelector('#contactForm button[type="button"]');
    
    const fullnameValid = !isEmpty(document.getElementById('fullname').value) && checkFullNameFieldSilent(document.getElementById('fullname').value);
    const phoneValid = !isEmpty(document.getElementById('phone').value) && checkPhoneNumberFieldSilent(document.getElementById('phone').value);
    const dateValid = document.getElementById('date').value.length >= 10 && 
                     document.getElementById('date').value !== 'ДД.ММ.ГГГГ' && 
                     checkDateOfBirthFieldSilent(document.getElementById('date').value);
    const genderValid = document.querySelector('input[name="gender"]:checked') !== null;
    const ageValid = !isEmpty(document.getElementById('age').value);
    const emailValid = !isEmpty(document.getElementById('email').value) && checkEmailFieldSilent(document.getElementById('email').value);
    const messageValid = !isEmpty(document.getElementById('message').value) && checkMessageFieldSilent(document.getElementById('message').value);
    
    const allFieldsValid = fullnameValid && phoneValid && dateValid && genderValid && ageValid && emailValid && messageValid;
    
    submitButton.disabled = !allFieldsValid;
}

function checkFullNameFieldSilent(value) {
    const words = value.trim().split(/\s+/);
    return words.length === 3 && words.every(word => word.length > 0);
}

function checkPhoneNumberFieldSilent(phone) {
    phone = phone.trim();
    if(phone.substring(0, 2) !== '+7' && phone.substring(0, 2) !== '+3') return false;
    if(phone.includes(' ')) return false;
    
    const digitsOnly = phone.substring(1);
    for(let i = 0; i < digitsOnly.length; i++) {
        const char = digitsOnly[i];
        if(char < '0' || char > '9') return false;
    }
    
    return phone.length >= 12 && phone.length <= 15;
}

function checkDateOfBirthFieldSilent(date) {
    if(date.length !== 10 || date[2] !== '.' || date[5] !== '.') return false;
    
    const parts = date.split('.');
    if(parts.length !== 3) return false;
    
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);
    
    if(isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if(day < 1 || day > 31) return false;
    if(month < 1 || month > 12) return false;
    if(year < 1900 || year > new Date().getFullYear()) return false;
    
    const dateObj = new Date(year, month - 1, day);
    return dateObj.getFullYear() === year && 
           dateObj.getMonth() === month - 1 && 
           dateObj.getDate() === day;
}

function checkEmailFieldSilent(email) {
    email = email.trim();
    if(email.indexOf('@') === -1) return false;
    
    const parts = email.split('@');
    if(parts.length !== 2) return false;
    if(parts[0].length === 0) return false;
    if(parts[1].length === 0 || parts[1].indexOf('.') === -1) return false;
    
    return true;
}

function checkMessageFieldSilent(message) {
    message = message.trim();
    return message.length >= 10 && message.length <= 1000;
}

function validateContactForm() {
    const isFormValid = 
        validateFullNameField() &&
        validatePhoneNumberField() &&
        validateDateOfBirthField() &&
        validateGenderField() &&
        validateAgeField() &&
        validateEmailField() &&
        validateMessageField();
    
    if(isFormValid) {
        alert('Форма успешно отправлена!');
    }
}

function validateTestForm() {
    clearTestErrors();

    const fullname = document.getElementById('fullname').value;
    if(isEmpty(fullname)) {
        showError('fullnameError', 'Поле ФИО обязательно для запполнения');
        return;
    }

    const group = document.getElementById("group").value;
    if(isEmpty(group)) {
        showError('groupError', 'Выберите группу');
        return;
    }

    const q1 = document.getElementById('q1').value;
    if(isEmpty(q1)) {
        showError('q1Error', 'Ответ на вопрос 1 обязателен');
        return;
    } else {
        if(!validateQ1Field(q1)) {
            return;
        }
    }

    const q2 = document.querySelectorAll('input[name="q2"]:checked');
    if (q2.length === 0) {
        showError('q2Error', 'Выберите хотя бы один вариант ответа');
        return;
    }

    const q3 = document.getElementById('q3').value;
    if(isEmpty(q3)) {
        showError('q3Error', 'Выберите ответ на вопрос 3');
        return;
    }

    clearTestErrors();
    alert("Ответ отправлен");
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
    hideError('dateError');
    hideError('genderError');
    hideError('ageError');
    hideError('emailError');
    hideError('messageError');
    
    resetFieldMark('fullname');
    resetFieldMark('phone');
    resetFieldMark('date');
    resetFieldMark('age');
    resetFieldMark('email');
    resetFieldMark('message');
    
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.classList.remove('invalid');
        radio.classList.remove('valid');
    });
    
    document.querySelector('#contactForm button[type="button"]').disabled = true;
}

function clearTestErrors() {
    hideError('fullnameError');
    hideError('groupError');
    hideError('q1Error');
    hideError('q2Error');
    hideError('q3Error');
}