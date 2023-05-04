import './index.css'; // добавьте импорт главного файла стилей

import {
  initialCards,
  objData,
  profileForm,
  formAddPhoto,
  profileRedaction,
  nameInput,
  jobInput,
  addPhoto,
  popupPhoto,
  photoForPopup,
  textForPopup,
  photoElements} from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

// Валидация карточек
const formProfileValidate = new FormValidator(objData, profileForm);
formProfileValidate.enableValidation();
const formPhotoValidate = new FormValidator(objData, formAddPhoto);
formPhotoValidate.enableValidation();

//Данные пользователя
const userInfo = new UserInfo(".profile__title", ".profile__subtitle");

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

