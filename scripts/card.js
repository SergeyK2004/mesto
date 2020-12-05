export class Card {
  constructor(image, title, cardSelector) {
    this._cardSelector = cardSelector;
    this._image = image;
    this._title = title;
    this._cardTemplate = document.querySelector(this._cardSelector);
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content.cloneNode(true);
    return cardElement;
  }
  _revertHeart = (evt) => {
    evt.target.classList.toggle("element__heart_active");
  };

  _deleteCard(evt) {
    evt.target.closest(".element").remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__heart")
      .addEventListener("click", this._revertHeart);
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", this._deleteCard);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").src = this._image;
    this._element.querySelector(".element__text").textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}
