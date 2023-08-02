'use strict';
const form = document.querySelector('.form');
const emailInput = document.querySelector('input[type=email]');
const linkInput = document.querySelector('input[type=url]');
const emailNotification = document.querySelector('.email__validator-notation');
const linkNotification = document.querySelector('.link__validator-notation');
let isEmailValid;
let isLinkValid;
let linkVal;

function emailVerification(e) {
    const regex = /^(?!.*[@._%+-]{2})(?![@._%+-])[a-zA-Z0-9!#$%&'*+/=?^_`{|.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let emailInputVal = e.target.value;
    if (!emailInputVal.match(regex)) {
        if (emailNotification.classList.contains('validator-notation_disabled')) {
            emailNotification.classList.remove('validator-notation_disabled');
        }
        emailNotification.classList.add('validator-notation_active');
        isEmailValid = false;
    } else {
        emailNotification.classList.add('validator-notation_disabled');
        emailNotification.classList.remove('validator-notation_active');
        isEmailValid = true;
    }
    checkInputs();
}


function linkVerification(e) {
    const regex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    let linkInputVal = e.target.value;
    if (!linkInputVal.match(regex)) {
        if (linkNotification.classList.contains('validator-notation_disabled')) {
            linkNotification.classList.remove('validator-notation_disabled');
        }
        linkNotification.classList.add('validator-notation_active');
        isLinkValid = false;

    } else {
        linkNotification.classList.add('validator-notation_disabled');
        linkNotification.classList.remove('validator-notation_active');
        isLinkValid = true;
        linkVal = linkInputVal;
    }
    checkInputs();
}
function checkInputs() {
    const submitBtn = document.querySelector('.form__btn');
    if (isEmailValid && isLinkValid) {
        submitBtn.removeAttribute('disabled');
        return;
    }

    submitBtn.setAttribute('disabled', '');
    return;
}

const postData = async (url, data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

function handleFormSubmit(e) {
    e.preventDefault();
    const formData = {
        email: emailInput.value,
        url: linkInput.value
    }
    postData(linkVal, formData); //по ідеі ця функція має бути асинхронною и тут має бути await postData(linkVal, formData);
    window.location.href = 'https://payproglobal.com/';
}

form.addEventListener('submit', handleFormSubmit);
emailInput.addEventListener('blur', emailVerification);
linkInput.addEventListener('blur', linkVerification);
