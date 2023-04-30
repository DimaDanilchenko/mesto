export default class Popup {
  constructor(popupSelector) {
    this.popupWork = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    element.classList.add(popupSelector);
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    element.classList.remove(popupSelector);
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
    this.popupWork.document.querySelectorAll('.popup__close').addEventListener('click', () => this.close());
  }
}
