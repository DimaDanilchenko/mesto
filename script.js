// Находим форму в DOM
let formElement = document.querySelector('.profile');
let profileRedaction = document.querySelector('.profile__redaction');

// Находим поля формы в DOM
//let nameInput = // Воспользуйтесь инструментом .querySelector()
//let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

window.addEventListener('DOMContentLoaded', function (){
	let profileRedaction = document.querySelector('.profile__redaction'),
	    popup = document.querySelector('.popup'),
	    popupClose = document.querySelector('.popup__close');
        
    profileRedaction.addEventListener('click', function (){
        popup.classList.add('popup_opened');
        document.body.style.overflow = 'hidden';
	});
	
	function closeModal() {
		popup.classList.remove('popup_opened');
		document.body.style.overflow = '';
	}
	
	popupClose.addEventListener('click', closeModal);
	
});