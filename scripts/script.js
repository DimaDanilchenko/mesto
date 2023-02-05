// Находим форму в DOM
const formElement = document.querySelector('.profile-popup__form'),
      formAddPhoto = document.querySelector('.add-photo-popup__form'),
      profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle'),
      popup = document.querySelector('.profile-popup'),
      popupAdd = document.querySelector('.add-photo-popup'),
      profileRedaction = document.querySelector('.profile__redaction'),
      popupClose = document.querySelector('.profile-popup__close'),
      popupCloseAdd = document.querySelector('.add-photo-popup__close'),
// Находим поля формы в DOM
      nameInput = document.querySelector('.popup__input_type_name'),
      jobInput = document.querySelector('.popup__input_type_job'),
      namePhotoInput = document.querySelector('.popup__input_type_photo'),
      linkInput = document.querySelector('.popup__input_type_link'),
      photoElements = document.querySelector('.elements'),
      addPhoto = document.querySelector('.profile__add');

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

const userPhotos = document.querySelector('#element-template').content,
popupPhoto = document.querySelector('.photo-popup');

initialCards.forEach((element) => {
  const userPhoto = userPhotos.querySelector('.element').cloneNode(true);
  userPhoto.querySelector('.element__image').src = element.link;
  userPhoto.querySelector('.element__text').textContent = element.name;
  userPhoto.querySelector('.element__image').alt = element.name;
  photoElements.append(userPhoto);
});


function renderPhoto(element){
  const userPhoto = userPhotos.querySelector('.element').cloneNode(true);
  userPhoto.querySelector('.element__image').src = element.link;
  userPhoto.querySelector('.element__text').textContent = element.name;
  userPhoto.querySelector('.element__image').alt = element.name;
  photoElements.prepend(userPhoto);
};

function openPopup(element){
  element.classList.add('popup-open');

};
function closePopup(element) {
  element.classList.remove('popup-open');
};

function handleFormSubmit (evt, popupElement) {
  evt.preventDefault();
  closePopup(popupElement);
};
function profileChange(){
  profileTitle.innerText =  nameInput.value;
  profileSubtitle.innerText = jobInput.value;
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', (evt)=>{
  handleFormSubmit(evt, popup);
});
formAddPhoto.addEventListener('submit', (evt)=>{
  handleFormSubmit(evt, popupAdd);
});

profileRedaction.addEventListener('click', ()=>{
  openPopup(popup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popup.querySelector('.profile-popup__save').addEventListener('click', ()=>{
    profileChange();
  })
});

popupClose.addEventListener('click', function(){
  closePopup(popup);
});

popupCloseAdd.addEventListener('click', function(){
  closePopup(popupAdd);
});

//----------------Likes------------------------------
const likeButtons = Array.from(document.querySelectorAll(".element__heart"));

likeButtons.forEach((evt) => {
  evt.addEventListener("click", () => {
    evt.classList.toggle("element__heart_active");
  });
});

//---------------------Add-Photo-----------------------
addPhoto.addEventListener('click', (evt) => {
  openPopup(popupAdd);
  const addObjPhoto = {};
  popupAdd.querySelector('.add-photo-popup__save').addEventListener('click', ()=>{
    console.log(namePhotoInput);
    addObjPhoto.name = namePhotoInput.value;
    addObjPhoto.link = linkInput.value;
    initialCards.unshift(addObjPhoto);
    renderPhoto(addObjPhoto);
    delete addObjPhoto.name;
    delete addObjPhoto.link;
    console.log(addObjPhoto);
  })

})
//------------------Delete-Photo--------------------------
const elementDelete = Array.from(document.querySelectorAll(".element__delete"));
const element = document.querySelectorAll('.element');
elementDelete.forEach((evt, index) => {
  evt.addEventListener("click", () => {
    initialCards.splice(index, 1);
    element[index].parentNode.removeChild(element[index]);
  });
});

//----------------------Zoom-------------------------------
const elementImage = Array.from(document.querySelectorAll(".element__image"));
elementImage.forEach((evt, index) => {
  evt.addEventListener("click", () => {
    openPopup(popupPhoto);
    popupPhoto.querySelector('.photo-popup__photo').src = evt.attributes.src.nodeValue;
    popupPhoto.querySelector('.photo-popup__text').textContent = evt.alt;
    document.querySelector('.photo-popup__close').addEventListener('click', ()=>{
      closePopup(popupPhoto);
    })
  });
});
