export default class Card {
  constructor({link, title, cardSelector, handleCardClick}) {
    this._cardSelector = cardSelector;
    this._image = link;
    this._title = title;
    this._cardTemplate = document.querySelector(this._cardSelector);
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  _revertHeart = (evt) => {
    this._element.querySelector('.element__heart').classList.toggle("element__heart_active");
  };

  _deleteCard(evt) {
    this._element.remove();
    this._element = null;

  }

  _setEventListeners() {
    this._element
      .querySelector(".element__heart")
      .addEventListener("click", this._revertHeart);
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => this._deleteCard());
    this._imageElement.addEventListener("click", this._handleCardClick);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".element__image");
    this._imageElement.src = this._image;
    this._element.querySelector(".element__text").textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}
