import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
  constructor({ handleFormSubmit, formSelector }) {
    super(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._element = this._popupForm.querySelector(".popup__form");
    this._setEventListeners();
  }

  open(cardObject) {
    this._cardObject = cardObject;
    super.open();
  }

  _setEventListeners() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardObject);
      this.close();
    });
  }
}
