import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor({item}, formSelector){
        super(formSelector);
        this._popupImagePhoto = this._popupForm.querySelector(".popup__image");
        this._popupImageTitle = this._popupForm.querySelector(".popup__image-title");
        this._src = item.src;
        this._title = item.textContent;

    }
    open(){
        this._popupImagePhoto.src = this._src;
        this._popupImageTitle.textContent = this._title;
        super.open();
    }
}