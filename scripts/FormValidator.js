

class FormValidator {
  constructor(data, form) {
    this.formSelector = data.formSelector;
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;
    this.form = form;
    this.inputList = Array.from(form.querySelectorAll(data.inputSelector));
    this.buttonElement = form.querySelector(data.submitButtonSelector);
  }
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  };

  _hideInputError(inputElement) {
    // Находим элемент ошибки
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  };

  // Функция принимает массив полей

  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this.inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true

      return !inputElement.validity.valid;
    })
  };
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
  };
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this.buttonElement.classList.add(this.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
      this.buttonElement.classList.remove(this.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  };
  _setEventListeners() {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    // Найдём в текущей форме кнопку отправки
    this._toggleButtonState();
    // Обойдём все элементы полученной коллекции
    this.inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);

        this._toggleButtonState();
      });
    });
  };
  enableValidation() {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    this._setEventListeners();
  };
  resetValidation() {
    this._toggleButtonState();

    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

  }

};


export { FormValidator };
