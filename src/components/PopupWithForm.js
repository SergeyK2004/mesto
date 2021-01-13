import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, formSelector }) {
    super(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._element = this._popupForm.querySelector(".popup__form");
    this._submitButton = this._element.querySelector(".popup__button-submit");
    this._setEventListeners();
  }

  close() {
    this._element.reset();
    super.close();
  }

  setButtonText(text) {
    this._submitButton.textContent = text;
  }
  getButtonText() {
    return this._submitButton.textContent;
  }
  _getInputValues() {
    this._inputList = this._element.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _setEventListeners() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
