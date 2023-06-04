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
  photoElements,
  profileImage,
  formAvatarPhoto
} from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Api from '../scripts/components/Api.js';

const api = new Api(
  {
    link: "https://mesto.nomoreparties.co/v1/cohort-65",
    token: "c2a28c16-df13-4b24-8ee0-81628722cf43",
  }
);

/*
  //Редактирование профиля
  fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'c2a28c16-df13-4b24-8ee0-81628722cf43',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Marie Skłodowska Curie',
    about: 'Physicist and Chemist'
  })
});
*/

/*
//Загрузка карточки на сервер
fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
  method: 'POST',
  headers: {
    authorization: 'c2a28c16-df13-4b24-8ee0-81628722cf43',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Дима Пример',
    link: 'https://Physicist_and_Chemist.com'
  })
});
*/

// Валидация карточек
const formProfileValidate = new FormValidator(objData, profileForm);
formProfileValidate.enableValidation();
const formPhotoValidate = new FormValidator(objData, formAddPhoto);
formPhotoValidate.enableValidation();
const formAvatarValidate = new FormValidator(objData, formAvatarPhoto);
formAvatarValidate.enableValidation();

//Данные пользователя
const userInfo = new UserInfo(".profile__title", ".profile__subtitle", ".profile__image");

// Создание карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    selector: '.element-template_type_default',
    handleCardClick: (data) => {
      popupImage.open(data)
    },
  })
  return card.generate();
};


let myInfo;
Promise.all([api.getUserProfile(), api.getInitialCards()])
  .then(([objectInfo, cardArr]) => {
    myInfo = objectInfo;

    userInfo.setUserInfo(objectInfo);
    cardList.renderItems(cardArr);
    console.log(objectInfo);
    console.log(cardArr);
  })
  .catch((error) => {
    console.log(error);
  });

const cardList = new Section(
  {
    renderer: (data) => {
      createCard(data);
      cardList.addItem(createCard(data));
    },
  },
  photoElements);


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
    console.log(data);
    const newCard = createCard(data);
    cardList.addItem(newCard);
    popupPlace.close();
  }
});
popupPlace.setEventListeners();
// Попап смены фото аватара
const popupAvatar = new PopupWithForm({
  popupSelector: '.profile-image-popup',
  handleFormSubmit: (data) => {
    popupAvatar.close();
  }
});
popupAvatar.setEventListeners();



// слушатель для попапа "Место"
addPhoto.addEventListener("click", () => {
  popupPlace.open();
  formPhotoValidate.resetValidation();
});

profileRedaction.addEventListener("click", () => {
  const getUser = userInfo.getUserInfo();
  nameInput.value = getUser.name;
  jobInput.value = getUser.about;
  popupProfile.open();
  formProfileValidate.resetValidation();
});

profileImage.addEventListener('click', () => {
  popupAvatar.open();
})