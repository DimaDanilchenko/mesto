import './index.css';

import {
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
  profileAvatar,
  formAvatarPhoto,
  profileAvatarInput,
  profileImage,
} from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Api from '../scripts/components/Api.js';
import PopupSubmit from '../scripts/components/PopupSubmit';

const api = new Api(
  {
    link: "https://mesto.nomoreparties.co/v1/cohort-69",
    token: "b0a021b8-85d2-4df0-a58b-761352eca6a6",
  }
);
//Данные пользователя
const userInfo = new UserInfo(".profile__title", ".profile__subtitle", ".profile__image");

let myAccountInfo;
Promise.all([api.getUserProfile(), api.getInitialCards()])
  .then(([objectInfo, cardArr]) => {
    myAccountInfo = objectInfo;
    userInfo.setUserInfo(objectInfo);
    cardList.renderItems(cardArr);
    console.log(objectInfo);
    console.log(cardArr);
  })
  .catch((error) => {
    console.log(error);
  });

// Валидация карточек
const formProfileValidate = new FormValidator(objData, profileForm);
formProfileValidate.enableValidation();
const formPhotoValidate = new FormValidator(objData, formAddPhoto);
formPhotoValidate.enableValidation();
const formAvatarValidate = new FormValidator(objData, formAvatarPhoto);
formAvatarValidate.enableValidation();



// Создание карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    myAccountInfo: myAccountInfo,
    selector: '.element-template_type_default',
    handleCardClick: (card) => {
      popupImage.open(card)
    },
    handleDeleteCard: (cardId) => {
      popupDelCard.setSubmitAction(() => {
        api.removeCard(cardId)
          .then(() => {
            card._remove();
            popupDelCard.close();
          })
          .catch(() => {
            console.log("Ошибка удаления");
          });
      });
      popupDelCard.open();
    },
    handlePutLike: () => {
      api.addLikeCard(card.getCurrentCard()._id)
        .then((itemCard) => {
          card.handleLike(itemCard);
        })
        .catch(() => console.log("Ошибка постановки лайка"));
    },
    handleDelLike: () => {
      api.removeLikeCard(card.getCurrentCard()._id)
        .then((itemCard) => {
          card.handleLike(itemCard);
        })
        .catch(() => console.log("Ошибка снятия лайка"));
    },
  })
  return card.generate();
};

const cardList = new Section(
  {
    renderer: (data) => {
      createCard(data);
      cardList.addItemAppend(createCard(data));
    },
  },
  photoElements);

//Попап фото
const popupImage = new PopupWithImage(".photo-popup");
popupImage.setEventListeners();

// Инициализация попапа "Удаление карточки"
const popupDelCard = new PopupSubmit({
  popupSelector: ".delete-photo-popup",
});
popupDelCard.setEventListeners();

//Попап профиля
const popupProfile = new PopupWithForm({
  popupSelector: '.profile-popup',
  handleFormSubmit: (data) => {
    popupProfile.setUserUX(true);
    api.setUserProfile(data)
      .then((dataInfo) => {
        userInfo.setUserInfo(dataInfo);
        popupProfile.close();
      })
      .catch((error) => console.log(error))
      .finally(() => popupProfile.setUserUX(false));
  },
});
popupProfile.setEventListeners();

// Попап смены фото аватара
const popupAvatar = new PopupWithForm({
  popupSelector: '.profile-image-popup',
  handleFormSubmit: (data) => {
    popupAvatar.setUserUX(true);
    api.setUserAvatar(data)
      .then((objectInfo) => {
        userInfo.setUserInfo(objectInfo);
        popupAvatar.close();
      })
      .catch((error) => console.log(error))
      .finally(() => popupAvatar.setUserUX(false));
  },
});
popupAvatar.setEventListeners();

// Попап места
const popupPlace = new PopupWithForm({
  popupSelector: '.add-photo-popup',
  handleFormSubmit: (data) => {
    popupPlace.setUserUX(true);
    api.addNewCard(data)
      .then((itemCard) => {
        const newCard = createCard(itemCard);
        cardList.addItem(newCard);
        popupPlace.close();
      })
      .catch((error) => console.log(error))
      .finally(() => popupPlace.setUserUX(false));
  },
});
popupPlace.setEventListeners();


// слушатель для попапа "Место"
addPhoto.addEventListener("click", () => {
  popupPlace.open();
  formPhotoValidate.resetValidation();
});
//Попап редактирование профиля
profileRedaction.addEventListener("click", () => {
  const getUser = userInfo.getUserInfo();
  nameInput.value = getUser.name;
  jobInput.value = getUser.about;
  popupProfile.open();
  formProfileValidate.resetValidation();
});

profileAvatar.addEventListener('click', () => {
  popupAvatar.open();
})
