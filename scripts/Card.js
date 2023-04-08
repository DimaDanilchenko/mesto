import { openPopup, photoForPopup, textForPopup, popupPhoto, createCard} from "./index.js";




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
    //this._element.querySelector('.element__image') = this._cardImage;
    //this._element.querySelector('.element__heart') = this._likeButton;
  	this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
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
      photoForPopup.src = this._link;
      textForPopup.textContent = this._name;
      photoForPopup.alt = this._name;
    });

    this._element.querySelector('.element__delete').addEventListener("click", () => {
      this._element.remove();
    });
  };

  _handleClick() {
    this._element.querySelector('.element__heart').classList.toggle("element__heart_active");
  };
};


export {Card};
