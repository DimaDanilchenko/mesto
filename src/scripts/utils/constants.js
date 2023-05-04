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
// Находим форму в DOM
const profileForm = document.querySelector('.profile-popup__form');
const formAddPhoto = document.querySelector('.add-photo-popup');
const profileRedaction = document.querySelector('.profile__redaction');
// Находим поля формы в DOM
const nameInput = document.querySelector('.profile-popup__input_type_name');
const jobInput = document.querySelector('.profile-popup__input_type_job');
const addPhoto = document.querySelector('.profile__add');
const popupPhoto = document.querySelector('.photo-popup');
const photoForPopup = popupPhoto.querySelector('.photo-popup__photo');
const textForPopup = popupPhoto.querySelector('.photo-popup__text');
const photoElements = document.querySelector('.elements');
export {initialCards, objData, profileForm, formAddPhoto, profileRedaction, nameInput, jobInput,
        addPhoto, popupPhoto, photoForPopup, textForPopup, photoElements};
