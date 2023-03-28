import {Card, initialCards, createCard} from './Card.js';
import {objData, FormValidator} from './FormValidator.js';
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
const allForm = Array.from(document.querySelectorAll('.popup'));




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
  profileTitle.innerText = nameInput.value;
  profileSubtitle.innerText = jobInput.value;
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
  formAddPhoto.querySelector('.add-photo-popup__save ').disabled = 'true';
  formAddPhoto.querySelector('.add-photo-popup__save ').classList.add('popup__button_disabled');
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
})

// Close popup all------------------
allForm.forEach((elem) => {
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

