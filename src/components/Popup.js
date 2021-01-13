export default class Popup {
  constructor(formSelector) {
    this._formSelector = formSelector;
    this._popupForm = document.querySelector(this._formSelector);
    this._closeButton = this._popupForm.querySelector(".popup__button-close");
    this.setEventListeners();
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupForm.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupForm.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popupForm.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
