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
      photoElements = document.querySelector('.elements');

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

function renderPhoto(a){
  const userPhotos = document.querySelector('#element-template').content;
  const userPhoto = userPhotos.querySelector('.element').cloneNode(true);
  userPhoto.querySelector('.element__image').src = a[0].link;
  userPhoto.querySelector('.element__text').textContent = a[0].name;
  userPhoto.querySelector('.element__image').alt = a[0].name;
  photoElements.prepend(userPhoto);
}
renderPhoto(initialCards);

function openPopup(){
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};
function closePopup() {
  popup.classList.remove('popup_opened');
};

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.innerText =  nameInput.value;
  profileSubtitle.innerText = jobInput.value;
  closePopup();
};
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
profileRedaction.addEventListener('click',openPopup);
popupClose.addEventListener('click', closePopup);

//----------------Likes------------------------------
const likeButtons = Array.from(document.querySelectorAll(".element__heart"));

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("element__heart_active");
  });
});

