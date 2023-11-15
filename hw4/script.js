
let registration = document.querySelector('.registration');
let formOk = document.querySelector('.form-ok');

let registrationEmail = document.querySelector('.registration__email');
let registrationEmailError = document.querySelector('.registration__email_error');

let registrationFullname = document.querySelector('.registration__full-name');
let registrationFullnameError = document.querySelector('.registration__full-name_error');

let registrationPassword = document.querySelector('.registration__password');
let registrationPasswordRepeat = document.querySelector('.registration__password-repeat');

let registrationPasswordError = document.querySelector('.registration__password_error');
let registrationPasswordRepeatError = document.querySelector('.registration__password-repeat_error');

let registrationAgreement = document.querySelector('.registration__agreement');
let registrationAgreementError = document.querySelector('.registration__agreement_error');

let flagOK = true;

registrationEmail.addEventListener('input', function (event) {
    event.preventDefault();

    let regexp = /\w+@\w+\.\w+/i

    flagOK = false;

    registrationEmailError.textContent = '';
    registrationEmailError.style.display = 'none';

    if(this.value.length>100 && !regexp.test(this.value)){
        registrationEmailError.textContent += 'Максимальный размер строки 100 символов\n';
        registrationEmailError.textContent += 'Email должен быть в формате (xxx@xxx.xx)';
        registrationEmailError.style.display = 'block';
    }
    else if(this.value.length>100){
        registrationEmailError.textContent += 'Максимальный размер строки 100 символов';
        registrationEmailError.style.display = 'block';
    }
    else if (!regexp.test(this.value)) {
        registrationEmailError.textContent += 'Email должен быть в формате (xxx@xxx.xx)';
        registrationEmailError.style.display = 'block';
    }
    else {
        flagOK = true;
    }
})

registrationFullname.addEventListener('input', function (event) {
    event.preventDefault();

    registrationFullnameError.textContent = '';
    registrationFullnameError.style.display = 'none';

    flagOK = false;

    if(this.value.length>150){
        registrationFullnameError.textContent += 'Максимальный размер строки 150 символов';
        registrationFullnameError.style.display = 'block';
    } else {
        flagOK = true;
    }

})

registrationPassword.addEventListener('input', function (event) {
    event.preventDefault();

    let regexpNumber = /.{8,30}/;
    let regexpSymbol = /[@:-_!#]/;

    registrationPasswordError.textContent = '';
    registrationPasswordError.style.display = 'none';

    flagOK = false;

    if (!regexpNumber.test(this.value) && !regexpSymbol.test(this.value)) {
        registrationPasswordError.textContent += 'Пароль должен содержать от 8 по 30 символов\n';
        registrationPasswordError.textContent += 'Пароль должен содержать как минимум 1 небуквенный символ (либо цифра, либо “@”, “-”, “:” и т.п.)';
		registrationPasswordError.style.display = 'block'; 
	}
	else if(!regexpNumber.test(this.value)){
        registrationPasswordError.textContent += 'Пароль должен содержать от 8 по 30 символов';
        registrationPasswordError.style.display = 'block'; 
    }
    else if (!regexpSymbol.test(this.value)) {
        registrationPasswordError.textContent += 'Пароль должен содержать как минимум 1 небуквенный символ (либо цифра, либо “@”, “-”, “:” и т.п.)';
        registrationPasswordError.style.display = 'block'; 
    } else {
        flagOK = true;
    }


})
registrationPasswordRepeat.addEventListener('input', function (event) {
	event.preventDefault();

    registrationPasswordRepeatError.textContent = '';
    registrationPasswordRepeatError.style.display = 'none';

    flagOK = false;

    registrationPasswordRepeatError.style.display = 'none';
	if (!(this.value === registrationPassword.value)) {
        registrationPasswordRepeatError.textContent += 'Пароли должны совпадать!';
		registrationPasswordRepeatError.style.display = 'block';
	} else {
        flagOK = true;
    }
	
})


registration.addEventListener('submit', function (event) {
    event.preventDefault();
    
    let inputs = document.querySelectorAll('.registration__input');

    for(let input of inputs) {
        if (input.value === '') {
            input.nextElementSibling.textContent = 'Поле обязательно для ввода!';
            input.nextElementSibling.style.display = 'block';

            flagOK = false;
        }
    }

    if (!registrationAgreement.checked) {
        registrationAgreementError.textContent = 'Вы обязаны подтвердить, что хотите зарегистрироваться';
        registrationAgreementError.style.display = 'block';

        flagOK = false
    }
    else {
        registrationAgreementError.style.display = 'none';
        
        flagOK = true;
    }

    if (flagOK) {
        let data = `
            email : ${registrationEmail.value},
            fullname : ${registrationFullname.value},
            password : ${registrationPassword.value}
        `;
        localStorage.setItem(`${registrationEmail.value}`, data);
        registration.style.display = 'none';
        formOk.style.display = 'block';
        
    }
});

