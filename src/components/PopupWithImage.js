import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(formSelector) {
    super(formSelector);
    this._popupImagePhoto = this._popupForm.querySelector(".popup__image");
    this._popupImageTitle = this._popupForm.querySelector(
      ".popup__image-title"
    );
  }

  open(item) {
    this._popupImagePhoto.src = item.src;
    this._popupImageTitle.textContent = item.textContent;
    super.open();
  }
}
