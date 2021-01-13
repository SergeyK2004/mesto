export default class Card {
  constructor({
    link,
    title,
    owner,
    thisUser,
    likes,
    cardId,
    cardSelector,
    handleCardClick,
    handleHeartClick,
    handleTrashClick,
  }) {
    this._cardSelector = cardSelector;
    this._image = link;
    this._title = title;
    this._owner = owner;
    this._thisUser = thisUser;
    this._likes = likes;
    this.cardId = cardId;
    this._cardTemplate = document.querySelector(this._cardSelector);
    this._handleCardClick = handleCardClick;
    this._handleHeartClick = handleHeartClick;
    this._handleTrashClick = handleTrashClick;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  _revertHeart = (evt) => {
    const deleteLike = this._elementHeart.classList.contains(
      "element__heart_active"
    );
    this._elementHeart.classList.toggle("element__heart_active");
    this._elementLikes.textContent = this._likes.length + (deleteLike ? -1 : 1);
    this._handleHeartClick(this.cardId, deleteLike, this);
  };
  _trashClick = (evt) => {
    this._handleTrashClick(this);
  };
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementHeart.addEventListener("click", this._revertHeart);
    this._elementTrash.addEventListener("click", this._trashClick);
    this._imageElement.addEventListener("click", this._handleCardClick);
  }
  likesUpdate(likesArray) {
    this._likes = likesArray;
    this._checkHeart();
  }
  _checkHeart() {
    this._element.querySelector(
      ".element__likes-count"
    ).textContent = this._likes.length;
    if (this._likes.findIndex((item) => item._id == this._thisUser) !== -1) {
      this._elementHeart.classList.add("element__heart_active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementHeart = this._element.querySelector(".element__heart");
    this._elementTrash = this._element.querySelector(".element__trash");
    this._elementLikes = this._element.querySelector(".element__likes-count");
    this._imageElement = this._element.querySelector(".element__image");
    this._imageElement.src = this._image;
    this._element.querySelector(".element__text").textContent = this._title;
    if (this._owner !== this._thisUser) {
      this._element
        .querySelector(".element__trash")
        .classList.add("element__trash_disable");
    }
    this._checkHeart();
    this._setEventListeners();
    return this._element;
  }
}
