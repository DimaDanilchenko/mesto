class Card {
  constructor({ data, selector, handleCardClick }) {
    this._name = data.name;
    //console.log(data.name);
    this._link = data.link;
    //console.log(data.link);
    this._selector = selector;
    this.handleCardClick = handleCardClick;
  };
  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  };
  generate() {
    this._element = this._getElement();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__heart');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;

    this._setEventListeners();

    return this._element;
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleClick();
    });

    this._cardImage.addEventListener('click', () => {
      this.handleCardClick({
        name: this._name,
        link: this._link,
      });
    });

    this._element.querySelector('.element__delete').addEventListener("click", () => {
      this._remove();
    });
  };
  _remove() {
    this._element.remove();
  }

  _handleClick() {
    this._likeButton.classList.toggle("element__heart_active");
  };
};


export { Card };
