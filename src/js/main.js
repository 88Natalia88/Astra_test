/*const buttonsModal = document.querySelectorAll('.button-modal');
const modalForm = document.querySelector('.modal__form');
const modal = document.querySelector('.modal');
const body = document.body;

buttonsModal.forEach(button =>{
    button.addEventListener('click', ()=>{
        createModal();
        modal.style.display = 'block';
        body.classList.add('locked');
    })
});

function createModal() {
    const inputTel = document.createElement('input');
    inputTel.type = 'tel';
    inputTel.name = 'phone';
    inputTel.id = 'user-tel';
    inputTel.placeholder = 'Введите ваш телефон';
    inputTel.classList.add('form__input');
    modalForm.appendChild(inputTel);

    const inputTelegram = document.createElement('input');
    inputTelegram.type = 'text';
    inputTelegram.name = 'telegram';
    inputTelegram.id = 'telegram';
    inputTelegram.placeholder = 'Введите ваш ник в телеграмм';
    inputTelegram.classList.add('form__input');
    modalForm.appendChild(inputTelegram);

    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal-wrapper');

    modalWrapper.innerHTML = `
                    <div class="form__custom-input">
                        <p class="form__error"></p>
                        <label for="user-name">ФИО</label>
                        <input type="text" name="name" id="user-name" required placeholder="Иванов Иван Иванович" class="form__input">
                    </div>
                    <div class="form__custom-input">
                        <p class="form__error"></p>
                        <input type="email" name="email" id="user-email" required placeholder="Введите вашу эл. почту" class="form__input">
                    </div>
                    <input type="tel" name="phone" id="user-tel" placeholder="Введите ваш телефон" class="form__input">
                    <input type="text" name="telegram" id="telegram" placeholder="Введите ваш ник в телеграмм" class="form__input">
                    <textarea name="note" id="user-note" placeholder="Примечание:" class="form__textarea"></textarea>
                    <button id="btn-submit" class="main-btn">Отправить</button>
                `;

    modalForm.appendChild(modalWrapper);
}*/