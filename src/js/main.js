window.addEventListener('DOMContentLoaded', () => {
    if (chooseButtons[0]) {
        chooseButtons[0].classList.add('active');
    }

    if (buttonTrans[0]) {
        buttonTrans[0].classList.add('active');
    }
    
    if (transports[0]) {
        transports[0].style.display = 'block';
    }
    
    if (choosePath[0]) {
        choosePath[0].style.display = 'flex';
    }
    if (choosePathDeparture[0]) {
        choosePathDeparture[0].style.display = 'flex';
    }

    if (departureButtons[0]) {
        departureButtons[0].classList.add('active');
    }
    
    if (buttonChooseTransports[0]) {
        buttonChooseTransports[0].classList.add('active');
    }
    
    if (transportsDeparture[0]) {
        transportsDeparture[0].style.display = 'block';
    }
});

const buttonsModal = document.querySelectorAll('.button-modal');
const modal = document.querySelector('.modal');
const body = document.body;

const chooseButtons = document.querySelectorAll('.button-choose');
const buttonTrans = document.querySelectorAll('.button-transport');
const transports = document.querySelectorAll('.form__transports');
const choosePath = document.querySelectorAll('.form__choose-path');
const choosePathDeparture = document.querySelectorAll('.form__choose-departure');
const transportsDeparture = document.querySelectorAll('.form__transports-departure');
const sucsessfullBtn = document.querySelector('.modal__sucsessfull-btn');

//открыть модальное окно
buttonsModal.forEach(button =>{
    button.addEventListener('click', ()=>{
        modal.style.display = 'block';
        body.classList.add('locked');
    })
});

//закрыть модальное окно

document.body.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        body.classList.remove('locked');
    }
});

sucsessfullBtn.addEventListener('click', ()=>{
    modal.style.display = 'none';
    body.classList.remove('locked');
})

//способ прибытия в Москву 13 марта
chooseButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        chooseButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        transports.forEach(transport => transport.style.display = 'none');
        transports[index].style.display = 'block';
    });
});

//выбор самолета или поезда

buttonTrans.forEach((button, index) => {
    button.addEventListener('click', () => {
        buttonTrans.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        choosePath.forEach(transport => transport.style.display = 'none');
        choosePath[index].style.display = 'flex';
    });
});

//способ отбытия из Москвы 15 марта

const departureButtons = document.querySelectorAll('.button-departure');
const buttonChooseTransports = document.querySelectorAll('.button-transports');

departureButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        departureButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        transportsDeparture.forEach(transport => transport.style.display = 'none');
        transportsDeparture[index].style.display = 'block';
    });
});

//выбор самолета или поезда для отбытия

buttonChooseTransports.forEach((button, index) => {
    button.addEventListener('click', () => {
        buttonChooseTransports.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        choosePathDeparture.forEach(transport => transport.style.display = 'none');
        choosePathDeparture[index].style.display = 'flex';

        
    });

    
});


//кастомный селект
const customSelect = document.querySelectorAll('.form__autocomplete');
const btnSelect = document.querySelectorAll('.form__select-btn');
const btnSelectImg = document.querySelectorAll('.form__arrow');

btnSelect.forEach((btn, index) =>{
    btn.addEventListener('click', ()=>{
        if(customSelect[index].style.display === 'block'){
            btnSelectImg[index].style.transform = 'rotate(0deg)';
            customSelect[index].style.display = 'none';
        } else{   
            btnSelectImg[index].style.transform = 'rotate(180deg)';
            customSelect[index].style.display = 'block';
        }
    })
})

//добавление в инпут выбранного значения
const items = document.querySelectorAll('.form__list-item');

items.forEach((item) => {
    item.addEventListener('click', function() {
        const input = this.closest('.form__select').querySelector('.form__input');
        input.value = this.textContent;
        customSelect.forEach(select => { 
            select.style.display = 'none';
        });
        btnSelectImg.forEach((img, i) => {
            img.style.transform = 'rotate(0deg)'; 
        });
        input.style.border = '1px solid #227AFF';
    });
});


let currentTab = 0;
showTab(currentTab); 

function showTab(n) {
    let x = document.getElementsByClassName("form__tab");
    x[n].style.display = "flex";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Завершить регистрацию";
    } else {
        document.getElementById("nextBtn").innerHTML = "Далее";
    }
}

function nextPrev(n) {

    let x = document.getElementsByClassName("form__tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    
    if (currentTab >= x.length) {
        //document.getElementById("regForm").submit();

        document.querySelector('.modal__sucsessfull').style.display = 'flex';
        document.querySelector('.form__buttons').style.display = 'none';
        document.querySelector(".modal__popup-progress").style.display = 'none';
        document.querySelector('.modal__popup-title').style.display = 'none';
    }

    showTab(currentTab);

}

const errors = document.querySelectorAll('.form__error');

function inputHandler(event) {
    let target = event.target;

    if (target.tagName === 'INPUT' && target.parentNode.parentNode.classList.contains('form__tab')) {
        let index = Array.from(target.parentNode.parentNode.querySelectorAll('input')).indexOf(target);

        if (target.value.trim() !== "") {
            target.classList.remove("invalid");
            errors[index].textContent = '';
            errors[index].style.display = 'none';
        } else {
            target.classList.add("invalid");
            errors[index].textContent = 'Это обязательное поле';
            errors[index].style.display = 'block';
        }
    }
}

document.querySelectorAll('.form__tab input').forEach(input => {
    input.addEventListener('input', inputHandler);
});

function validateForm() {
    let x, y, i, valid = true;
    x = document.getElementsByClassName("form__tab");

    if (currentTab === 0) {
        y = x[currentTab].getElementsByTagName("input");
        for (i = 0; i < y.length; i++) {
            if (y[i].value == "") {
                y[i].classList.add("invalid");
                valid = false;
                errors[i].textContent = 'Это обязательное поле';
                errors[i].style.display = 'block';
            } else {
                y[i].classList.remove("invalid");
                y[i].style.border = '1px solid #227AFF';
                errors[i].textContent = '';
                errors[i].style.display = 'none';
            }
            //y[i].addEventListener('input', inputHandler);
        }
    } else if (currentTab === 1) {
        if (chooseButtons[0].classList.contains('active')) {
            valid = true; 
        } else if (chooseButtons[1].classList.contains('active')) {
            let selectedTransportIndex = -1;
    
            buttonTrans.forEach((btn, i) => {
                if (btn.classList.contains('active')) {
                    selectedTransportIndex = i;
                }
            });
    
            if (selectedTransportIndex !== -1) {
                choosePath.forEach((path, index) => {
                    if (index === selectedTransportIndex) {
                        let inputs = path.querySelectorAll('input');
                        let errors = path.querySelectorAll('.form__error');
                        inputs.forEach((currentInput, i) => { 
                            if (currentInput.value === "") {
                                currentInput.classList.add("invalid");
                                valid = false;
                                errors[i].textContent = 'Это обязательное поле';
                                errors[i].style.display = 'block';
                            } else {
                                currentInput.classList.remove("invalid");
                                currentInput.style.border = '1px solid #227AFF';
                                errors[i].textContent = '';
                                errors[i].style.display = 'none';
                            }
                            currentInput.addEventListener('input', inputHandler);
                        });
                    }
                });
            }
        }
    } else if (currentTab === 2) {
        if (transportsDeparture[0].classList.contains('active')) {
            valid = true; 
        } else if (transportsDeparture[1].classList.contains('active')) {
            let selectedTransportIndex = -1;
    
            buttonChooseTransports.forEach((btn, i) => {
                if (btn.classList.contains('active')) {
                    selectedTransportIndex = i;
                }
            });
    
            if (selectedTransportIndex !== -1) {
                choosePathDeparture.forEach((path, index) => {
                    if (index === selectedTransportIndex) {
                        let inputs = path.querySelectorAll('input');
                        let errorsText = path.querySelectorAll('.form__error');
                        let checkbox = document.querySelector('.form__real-checkbox');
                        let customCheckbox = document.querySelector('.form__custom-checkbox');
                        
                        if (!checkbox.checked) {
                            //customCheckbox.classList.add('invalid');
                            customCheckbox.style.border = '2px solid #F93536';
                            errors.textContent = 'Необходимо дать ваше согласие';
                            valid = false;
                        } else {
                            //customCheckbox.classList.remove('invalid');
                            customCheckbox.style.border = '2px solid #227AFF';
                            errors.textContent = '';
                            valid = true
                        }
    
                        checkbox.addEventListener('change', function() {
                            if (checkbox.checked) {
                                //customCheckbox.classList.remove('invalid');
                                customCheckbox.style.border = '2px solid #227AFF';
                                errors.textContent = '';
                            } else {
                                //customCheckbox.classList.add('invalid');
                                customCheckbox.style.border = '2px solid #F93536';
                                errors.textContent = 'Необходимо отметить согласие';
                            }
                        });


                        inputs.forEach((currentInput, i) => {
                            if (currentInput.value === "") {
                                currentInput.classList.add("invalid");
                                valid = false;
                                errorsText[i].textContent = 'Это обязательное поле';
                                errorsText[i].style.display = 'block';
                            } else {
                                currentInput.classList.remove("invalid");
                                currentInput.style.border = '1px solid #227AFF';
                                errorsText[i].textContent = '';
                                errorsText[i].style.display = 'none';
                            }
                            currentInput.addEventListener('input', inputHandler);
                            //currentInput.addEventListener('input', inputHandler);
                        });
                    }
                });
            }
        }
    }

    if (valid) {
        document.getElementsByClassName("modal__popup-span")[currentTab].className += " active";
    }

    return valid;
}