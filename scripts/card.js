const popupImage = document.querySelector(".popup_image");
const popupImagePhoto = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');

class Card {
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
  _showPopupImage(evt) {
  popupImagePhoto.src = this._image;
  popupImageTitle.textContent = this._title;
  openPopup(popupImage);
}


 _deleteCard(evt){
  evt.target.closest(".element").remove();
}

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', showPopupImage);
    _element.querySelector('.element__heart').addEventListener('click', (evt) => evt.target.classList.toggle('element__heart_active'));
    _element.querySelector('.element__trash').addEventListener('click', _deleteCard);

  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__text').textContent = this.title;
    this._setEventListeners();
    return this._element;
  }
}