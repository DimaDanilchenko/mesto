import { initialCards } from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { objData } from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Popup from '../scripts/components/Popup.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
// Находим форму в DOM
const profileForm = document.querySelector('.profile-popup__form');
const formAddPhoto = document.querySelector('.add-photo-popup');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('.profile-popup');
const popupAdd = document.querySelector('.add-photo-popup');
const profileRedaction = document.querySelector('.profile__redaction');
const popupCloseAdd = document.querySelector('.add-photo-popup__close');
// Находим поля формы в DOM
const nameInput = document.querySelector('.profile-popup__input_type_name');
const jobInput = document.querySelector('.profile-popup__input_type_job');
const namePhotoInput = document.querySelector('.add-photo-popup__input_type_photo');
const linkInput = document.querySelector('.add-photo-popup__input_type_link');
const addPhoto = document.querySelector('.profile__add');
const popupPhoto = document.querySelector('.photo-popup');
const photoForPopup = popupPhoto.querySelector('.photo-popup__photo');
const textForPopup = popupPhoto.querySelector('.photo-popup__text');
const allPopup = Array.from(document.querySelectorAll('.popup'));
const photoElements = document.querySelector('.elements');

// Валидация карточек
const formProfileValidate = new FormValidator(objData, profileForm);
formProfileValidate.enableValidation();
const formPhotoValidate = new FormValidator(objData, formAddPhoto);
formPhotoValidate.enableValidation();

//Данные пользователя
const userInfo = new UserInfo(".profile__title",".profile__subtitle");

// Создание карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    selector: '.element-template_type_default',
    handleCardClick: (data) => {
      popupImage.open(data)
    }
  })
  return card.generate();
};

const cardList = new Section(
  {
    renderer: (data) => {
      createCard(data);
      cardList.addItem(createCard(data));
    },
  },
  photoElements);

// Просмотр массива начального с карточками
cardList.renderItems(initialCards);

//Попап фото
const popupImage = new PopupWithImage(".photo-popup");
popupImage.setEventListeners();

//Попап профиля
const popupProfile = new PopupWithForm({
  popupSelector: '.profile-popup',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    console.log(data);
    popupProfile.close();
  }
});
popupProfile.setEventListeners();

// Попап места
const popupPlace = new PopupWithForm({
  popupSelector: '.add-photo-popup',
  handleFormSubmit: (data) => {
    const newCard = createCard(data);
    cardList.addItem(newCard);
    popupPlace.close();
  }
});

popupPlace.setEventListeners();


// слушатель для попапа "Место"
addPhoto.addEventListener("click", () => {
  popupPlace.open();
  formPhotoValidate.resetValidation();
});
/*
formAddPhoto.addEventListener('submit', (evt) => {
  popupPlace.open();
  formPhotoValidate.resetValidation();
});
*/
profileRedaction.addEventListener("click", () => {
  const getUser = userInfo.getUserInfo();
  nameInput.value = getUser.name;
  jobInput.value = getUser.about;
  popupProfile.open();
  formProfileValidate.resetValidation();
});


export { photoForPopup, textForPopup, popupPhoto };
