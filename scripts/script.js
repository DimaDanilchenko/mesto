// Находим форму в DOM
const formElement = document.querySelector('.popup__form'),
      profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle'),
      popup = document.querySelector('.popup'),
      profileRedaction = document.querySelector('.profile__redaction'),
      popupClose = document.querySelector('.popup__close'),
// Находим поля формы в DOM
      nameInput = document.querySelector('.popup__input_type_name'),
      jobInput = document.querySelector('.popup__input_type_job'),
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

const userPhotos = document.querySelector('#element-template').content;

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

function openPopup(){
  popup.classList.add('popup_opened');

};
function closePopup() {
  popup.classList.remove('popup_opened');
};

function handleFormSubmit (evt) {
  evt.preventDefault();
  closePopup();
};
function profileChange(){
  profileTitle.innerText =  nameInput.value;
  profileSubtitle.innerText = jobInput.value;
};
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', (evt)=>{
  handleFormSubmit(evt);
});
profileRedaction.addEventListener('click', ()=>{
  openPopup();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popup.querySelector('.popup__save').addEventListener('click', ()=>{
    profileChange();
  })
});
popupClose.addEventListener('click', closePopup);

//----------------Likes------------------------------
const likeButtons = Array.from(document.querySelectorAll(".element__heart"));

likeButtons.forEach((evt) => {
  evt.addEventListener("click", () => {
    evt.classList.toggle("element__heart_active");
  });
});

//---------------------Add-Photo-----------------------
addPhoto.addEventListener('click', function(){
  openPopup();
  popup.querySelector('.popup__title').textContent = 'Новое место';
  popup.querySelector('.popup__input_type_name').placeholder = 'Название';
  popup.querySelector('.popup__input_type_job').placeholder = 'Ссылка на скачивание';
  nameInput.value = '';
  jobInput.value = '';
  popup.querySelector('.popup__save').addEventListener('click', ()=>{
    let addObjPhoto = {};
    addObjPhoto.name = nameInput.value;
    addObjPhoto.link = jobInput.value;
    console.log(addObjPhoto);
    initialCards.unshift(addObjPhoto);
    console.log(initialCards);
    renderPhoto(addObjPhoto);
  })
})
//------------------Delete-Photo--------------------------
const elementDelete = Array.from(document.querySelectorAll(".element__delete"));
const element = document.querySelectorAll('.element');
elementDelete.forEach((evt, index) => {
  evt.addEventListener("click", () => {
    console.log(index);
    initialCards.splice(index, 1);
    console.log(initialCards);
    element[index].parentNode.removeChild(element[index]);
  });
});

//----------------------Zoom-------------------------------
const elementImage = Array.from(document.querySelectorAll(".element__image"));
elementImage.forEach((evt, index) => {
  evt.addEventListener("click", () => {
    console.log(index);

  });
});
