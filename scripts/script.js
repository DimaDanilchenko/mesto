// Находим форму в DOM
let formElement = document.querySelector('.profile'),
    profileRedaction = document.querySelector('.profile__redaction'),
    popup = document.querySelector('.popup'),
    popupClose = document.querySelector('.popup__close'),
    popupName = popup.querySelector('.popup__name'),
    popupJob = popup.querySelector('.popup__job'),
    profileTitle = formElement.querySelector('.profile__title'),
    profileSubtitle = formElement.querySelector('.profile__subtitle'),
    popupSave = popup.querySelector('.popup__save'),
    heartTouch = document.querySelector('.element__heart');


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}
function addPopupInfo(){
    popupName.value = profileTitle.innerText;
    popupJob.value = profileSubtitle.innerText;
}

formElement.addEventListener('submit', handleFormSubmit);

profileRedaction.addEventListener('click', function (){
    popup.classList.add('popup_opened');
    document.body.style.overflow = 'hidden';
    addPopupInfo();
});

function closePopup() {
    popup.classList.remove('popup_opened');
    document.body.style.overflow = '';
}

popupClose.addEventListener('click', closePopup);

function popupSaveFunction(){
    profileTitle.innerText = popupName.value;
    profileSubtitle.innerText = popupJob.value;
    closePopup();
}
popupSave.addEventListener('click', popupSaveFunction);