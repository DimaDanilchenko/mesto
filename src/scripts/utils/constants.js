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
const formAvatarPhoto = document.querySelector('.profile-image-popup');
// Находим поля формы в DOM
const nameInput = document.querySelector('.profile-popup__input_type_name');
const jobInput = document.querySelector('.profile-popup__input_type_job');
const addPhoto = document.querySelector('.profile__add');
const popupPhoto = document.querySelector('.photo-popup');
const photoForPopup = document.querySelector('.photo-popup__photo');
const textForPopup = document.querySelector('.photo-popup__text');
const photoElements = document.querySelector('.elements');
const profileAvatar = document.querySelector('.profile__avatar');
const profileImage = document.querySelector('.profile__image');
const profileAvatarInput = document.querySelector('.profile-image-popup__input_type_link');
export {objData, profileForm, formAddPhoto, formAvatarPhoto, profileRedaction, nameInput, jobInput,
        addPhoto, popupPhoto, photoForPopup, textForPopup, photoElements, profileAvatar, profileAvatarInput, profileImage};
