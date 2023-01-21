// Находим форму в DOM
const formElement = document.querySelector('.popup__form'),
      profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle'),
      popup = document.querySelector('.popup'),
      profileRedaction = document.querySelector('.profile__redaction'),
      popupClose = document.querySelector('.popup__close'),
// Находим поля формы в DOM
      nameInput = document.querySelector('.popup__input_type_name'),
      jobInput = document.querySelector('.popup__input_type_job');

function openPopup(){
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};
function closePopup() {
  popup.classList.remove('popup_opened');
};

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.innerText =  nameInput.value;
  profileSubtitle.innerText = jobInput.value;
  closePopup();
};
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
profileRedaction.addEventListener('click',openPopup);
popupClose.addEventListener('click', closePopup);

//----------------Likes------------------------------
const likeButtons = Array.from(document.querySelectorAll(".element__heart"));

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("element__heart_active");
  });
});

