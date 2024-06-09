window.addEventListener('DOMContentLoaded', () => {
    chooseButtons[0].classList.add('active');
    buttonTrans[0].classList.add('active');
    transports[0].style.display = 'block'; 
    choosePath[0].style.display = 'flex';
});

const buttonsModal = document.querySelectorAll('.button-modal');
const modal = document.querySelector('.modal');
const body = document.body;

const chooseButtons = document.querySelectorAll('.button-choose');
const buttonTrans = document.querySelectorAll('.button-transport');
const transports = document.querySelectorAll('.form__transports');
const choosePath = document.querySelectorAll('.form__choose-path');
//открыть модальное окно
buttonsModal.forEach(button =>{
    button.addEventListener('click', ()=>{
        modal.style.display = 'block';
        body.classList.add('locked');
    })
});

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


const currentTab = 0; // Устанавливаем первую (0) вкладку как текущую
showTab(currentTab); // Отображаем текущую вкладку

function showTab(n) {
  // Эта функция отображает заданную вкладку формы ...
  let x = document.getElementsByClassName("form__tab");
  x[n].style.display = "flex";
  // ... и фиксирует кнопки Назад/Дальше:
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
  // ... и запускает функцию, отображающую корректный индикатор этапа:
  fixStepIndicator(n)
}


function fixStepIndicator(n) {
    // Эта функция удаляет класс "active" у всех этапов...
    let i, x = document.getElementsByClassName("modal__popup-span");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... и добавляет класс "active" текущему этапу:
    x[n].className += " active";
  }
  function nextPrev(n) {
    // Это функция определяет какую вкладку отображать
    let x = document.getElementsByClassName("form__tab");
    // Выйти из функции, если какое-нибудь поле текущей вкладки заполнено неверно:
    if (n == 1 && !validateForm()) return false;
    // Скрыть текущую вкладку:
    x[currentTab].style.display = "none";
    // Увеличить или уменьшить номер текущей вкладки на 1:
    currentTab = currentTab + n;
    // если вы достигли конца формы... :
    if (currentTab >= x.length) {
      //...то данные формы отправляются на сервер:
      document.getElementById("regForm").submit();
      return false;
    }
    // Иначе, отображаем нужную вкладку:
    showTab(currentTab);
  }
  function validateForm() {
    // Это функция проверяет заполнение полей формы
    let x, y, i, valid = true;
    x = document.getElementsByClassName("form__tab");
    y = x[currentTab].getElementsByTagName("input");
    // Цикл, который проверяет каждое поле ввода текущей вкладки:
    for (i = 0; i < y.length; i++) {
      // Если поле пустое...
      if (y[i].value == "") {
        // добавляем ему класс "invalid":
        y[i].className += " invalid";
        // и устанавливаем текущий статус валидности в false:
        valid = false;
      }
    }
    // Если статус валидности true, помечаем этот шаг как завершенный и валидный:
    if (valid) {
      document.getElementsByClassName("modal__popup-span")[currentTab].className += " active";
    }
    return valid; // возвращаем статус валидности
  }
