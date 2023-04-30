export default class Popup {
  constructor(popupSelector) {
    this._popupWork = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popupWork.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popupWork.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _handleEscCloseOverlay(evt){
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  setEventListeners() {
    this._popupWork.querySelector('.popup__close').addEventListener('click', () => this.close());
    this._popupWork.addEventListener("mousedown", (evt) => this._handleEscCloseOverlay(evt));
  }
}
