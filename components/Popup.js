import { popupCloseButton } from "../utils/constants.js";

export default class Popup{
    constructor(formSelector) {
        this._formSelector = formSelector;
        this._popupForm = document.querySelector(this._formSelector);
        this._closeButton = this._popupForm.querySelector(".popup__button-close");
        this.setEventListeners();
        this._handler = this._handleEscClose(this);
    }

    open(){
        this._popupForm.classList.add("popup_opened");
        document.addEventListener("keydown", this._handler);
    }

    close(){
        this._popupForm.classList.remove("popup_opened");
    }

    setEventListeners(){
        this._closeButton.addEventListener("click", (evt) => {
            this.close();
          });
          this._popupForm.addEventListener("click", (evt) =>{
            if (evt.target.classList.contains("popup")) {
                this.close();
            }      
        });
    }

    _handleEscClose(context) {
        return function(evt){
            if (evt.key === "Escape") {
                document.removeEventListener("keydown", context._handler);
                context.close();
            }
        }
    }
}