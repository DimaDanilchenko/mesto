import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
// Находим форму в DOM
const profileForm = document.querySelector('.profile-popup__form'),
  formAddPhoto = document.querySelector('.add-photo-popup__form'),
  profileTitle = document.querySelector('.profile__title'),
  profileSubtitle = document.querySelector('.profile__subtitle'),
  profilePopup = document.querySelector('.profile-popup'),
  popupAdd = document.querySelector('.add-photo-popup'),
  profileRedaction = document.querySelector('.profile__redaction'),
  popupCloseAdd = document.querySelector('.add-photo-popup__close'),
  // Находим поля формы в DOM
  nameInput = document.querySelector('.profile-popup__input_type_name'),
  jobInput = document.querySelector('.profile-popup__input_type_job'),
  namePhotoInput = document.querySelector('.add-photo-popup__input_type_photo'),
  linkInput = document.querySelector('.add-photo-popup__input_type_link'),
  addPhoto = document.querySelector('.profile__add'),
  popupPhoto = document.querySelector('.photo-popup'),
  photoForPopup = popupPhoto.querySelector('.photo-popup__photo'),
  textForPopup = popupPhoto.querySelector('.photo-popup__text');
const allPopup = Array.from(document.querySelectorAll('.popup'));
const photoElements = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const objData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formProfileValidate = new FormValidator(objData, profileForm);
formProfileValidate.enableValidation();
const formPhotoValidate = new FormValidator(objData, formAddPhoto);
formPhotoValidate.enableValidation();

// Просмотр массива
initialCards.forEach((item) => {
  createCard(item);
});

function openPopup(element) {
  element.classList.add('popup_open');
  document.addEventListener('keydown', closeByEscape);
};
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

function closePopup(element) {
  element.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEscape);
};

function handleFormSubmit(evt, popupElement) {
  evt.preventDefault();
  closePopup(popupElement);
};
function changeProfile() {
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  formProfileValidate._toggleButtonState();
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', (evt) => {
  handleFormSubmit(evt, profilePopup);
  changeProfile();
});
formAddPhoto.addEventListener('submit', (evt) => {
  handleFormSubmit(evt, popupAdd);
  const addObjPhoto = {};
  console.log(namePhotoInput);
  addObjPhoto.name = namePhotoInput.value;
  addObjPhoto.link = linkInput.value;
  createCard(addObjPhoto);
  evt.target.reset();
  console.log("Good");
});

profileRedaction.addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

//---------------------Add-Photo-----------------------
addPhoto.addEventListener('click', (evt) => {
  openPopup(popupAdd);
  formPhotoValidate._toggleButtonState();
})

// Close popup all------------------
allPopup.forEach((elem) => {
  elem.addEventListener('click', function (e) {
    if (e.target === elem) {
      closePopup(elem);
      console.log("Good");
      console.log(elem);
      console.log(e.keyCode);
    }
  })
});


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup);
  }
}
function createCard(item) {
  const card = new Card(item, '.element-template_type_default');
  const cardElement = card.generate();
  photoElements.prepend(cardElement);
}



export { openPopup, photoForPopup, textForPopup, popupPhoto };
