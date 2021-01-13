export default class FormValidator {
  constructor(settings, checkingForm) {
    this._settings = settings;
    this._checkingForm = checkingForm;
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputField) => {
      return !inputField.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement, settings) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  };

  _showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };

  _checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    } else {
      this._hideInputError(formElement, inputElement, settings);
    }
  };

  _setEventListeners = (formElement, settings) => {
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement, settings);
        this._toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };

  _checkValidation(thisForm, settings) {
    const inputList = Array.from(
      thisForm.querySelectorAll(settings.inputSelector)
    );
    const buttonElement = thisForm.querySelector(settings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
      this._hideInputError(thisForm, inputElement, settings);
    });
  }

  clearFormErrors = () => {
    this._checkValidation(this._checkingForm, this._settings);
  };
  enableValidation = () => {
    this._checkingForm.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners(this._checkingForm, this._settings);
  };
}
