export default class Card {
  constructor({link, title, cardSelector, handleCardClick}) {
    this._cardSelector = cardSelector;
    this._image = link;
    this._title = title;
    this._cardTemplate = document.querySelector(this._cardSelector);
    this._handleCardClick = handleCardClick;
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
