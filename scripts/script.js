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
      photoElements = document.querySelector('.elements'),
      addPhoto = document.querySelector('.profile__add'),
      cardTemplate = document.querySelector('#element-template').content,
      popupPhoto = document.querySelector('.photo-popup'),
      photoForPopup = popupPhoto.querySelector('.photo-popup__photo'),
      textForPopup = popupPhoto.querySelector('.photo-popup__text');

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


// Просмотр массива
initialCards.forEach((item) => {
  photoElements.append(createCard(item));
});

function openPopup(element){
  element.classList.add('popup_open');
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
};

function handleFormSubmit (evt, popupElement) {
  evt.preventDefault();
  closePopup(popupElement);
};
function changeProfile(){
  profileTitle.innerText =  nameInput.value;
  profileSubtitle.innerText = jobInput.value;
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', (evt)=>{
  handleFormSubmit(evt, profilePopup);
  changeProfile();
});
formAddPhoto.addEventListener('submit', (evt)=>{
  handleFormSubmit(evt, popupAdd);
  const addObjPhoto = {};
  console.log(namePhotoInput);
  addObjPhoto.name = namePhotoInput.value;
  addObjPhoto.link = linkInput.value;
  photoElements.prepend(createCard(addObjPhoto));
  evt.target.reset();
});

profileRedaction.addEventListener('click', ()=>{
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

//---------------------Add-Photo-----------------------
addPhoto.addEventListener('click', (evt) => {
  openPopup(popupAdd);
})


function createCard(item) {
  const userPhoto = cardTemplate.querySelector('.element').cloneNode(true),
  elementImage = userPhoto.querySelector('.element__image');

  elementImage.src = item.link;
  userPhoto.querySelector('.element__text').textContent = item.name;
  elementImage.alt = item.name;

  userPhoto.querySelector('.element__heart').addEventListener("click", () => {
    userPhoto.querySelector('.element__heart').classList.toggle("element__heart_active");
  });

  elementImage.addEventListener("click", () => {
    openPopup(popupPhoto);
      photoForPopup.src = item.link;
      textForPopup.textContent = item.name;
      photoForPopup.alt = item.name;
  });

  userPhoto.querySelector('.element__delete').addEventListener("click", () => {
    userPhoto.remove();
  });
  return userPhoto;
}

