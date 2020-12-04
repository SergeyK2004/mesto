export class Card {
  constructor(image, title, cardSelector) {
    this._cardSelector = cardSelector;
    this._image = image;
    this._title = title;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return cardElement;
  }


 _deleteCard(evt){
  evt.target.closest(".element").remove();
}

  _setEventListeners() {
     this._element.querySelector('.element__heart').addEventListener('click', (evt) => evt.target.classList.toggle('element__heart_active'));
    this._element.querySelector('.element__trash').addEventListener('click', this._deleteCard);


  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__text').textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}