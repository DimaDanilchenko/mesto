class Card {
  constructor({ data, userId, myAccountInfo, selector, handleCardClick, handleDeleteCard, handlePutLike, handleDelLike,  }) {
    this._name = data.name;
    this._link = data.link;
    this._likesArr = data.likes;
    this._selector = selector;
    this._myId = myAccountInfo._id;
    this._card = data;
    this.idCard = data._id;
    this._userId = userId;
    this._idUserCard = data.owner._id;

    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handlePutLike = handlePutLike;
    this._handleDelLike = handleDelLike;
  };
  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  };
  handleLike(data) {
    this._likesArr = data.likes;
    this._getLikeValue(data);
    if (this._checkMyLike()) {
      this._element
        .querySelector(".element__heart")
        .classList.add("element__heart_active");
    } else {
      this._element
        .querySelector(".element__heart")
        .classList.remove("element__heart_active");
    }
  }
  _getLikeValue(data) {
    this._element.querySelector(".element__heart-counter").textContent =
      data.likes.length;
  }

  getCurrentCard() {
    return this._card;
  }
  _checkMyLike() {
    return Boolean(this._likesArr.find((data) => data._id == this._myId));
  }
  generate() {
    this._element = this._getElement();
    this._elementText = this._element.querySelector(".element__text");
    this._elementImage = this._element.querySelector(".element__image");
    this._elementLikes = this._element.querySelector(".element__heart-counter");
    this._elementDeleteButton = this._element.querySelector(".element__delete");

    if (this._idUserCard == this._myId)
      this._elementDeleteButton.classList.add("element__delete_active");
    if (this._checkMyLike()) {
      this._element
        .querySelector(".element__heart")
        .classList.add("element__heart_active");
    }
    this._elementLikes.textContent = this._likesArr.length;
    this._elementText.textContent = this._name;
    this._elementImage.src = this._link;
    this._setEventListeners();
    return this._element;
  };

  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._card);
      });

    this._element
      .querySelector(".element__heart")
      .addEventListener("click", () => {
        if (this._checkMyLike()) {
          this._handleDelLike();
        } else {
          this._handlePutLike();
        }
      });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => this._handleDeleteCard(this._card._id));
  };
  _remove() {

    this._element.remove();

  }
};


export { Card };
