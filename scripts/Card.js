const photoElements = document.querySelector('.elements');
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


class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  };
  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
	};
  generate() {
    this._element = this._getElement();
  	this._element.querySelector('.element__image').src = this._link;
  	this._element.querySelector('.element__text').textContent = this._name;

    this._setEventListeners();

  	return this._element;
  };

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => {
      this._handleClick();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      openPopup(popupPhoto);
      photoForPopup.src = this.link;
      textForPopup.textContent = this.name;
      photoForPopup.alt = this.name;
    });

    this._element.querySelector('.element__delete').addEventListener("click", () => {
      this._element.remove();
    });
  };

  _handleClick() {
    this._element.querySelector('.element__heart').classList.toggle("element__heart_active");
  };
};
function createCard(item){
  const card = new Card(item, '.element-template_type_default');
  const cardElement = card.generate();
  photoElements.prepend(cardElement);
}
// Просмотр массива
initialCards.forEach((item) => {
  createCard(item);
});
export { Card, initialCards, createCard};
