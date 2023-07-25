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
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
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
}


function linkVerification(e) {
    const regex = /^https:\/\//;
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

}
function checkInputs() {
    const submitBtn = document.querySelector('.form__btn');
    if (isEmailValid && isLinkValid) {
        submitBtn.removeAttribute('disabled');
        return;
    }

    submitBtn.setAttribute('disabled', '');
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
    postData(linkVal);
    window.location.href = 'https://payproglobal.com/';
}

form.addEventListener('submit', handleFormSubmit);
emailInput.addEventListener('input', emailVerification);
linkInput.addEventListener('input', linkVerification);
emailInput.addEventListener('blur', checkInputs);
linkInput.addEventListener('blur', checkInputs);