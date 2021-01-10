export const popupProfile = document.querySelector(".popup_profile");
export const popupFormProfile = document.querySelector(".popup__form_profile");
export const inputName = popupProfile.querySelector(".popup__input_type_name");
export const inputSpec = popupProfile.querySelector(".popup__input_type_spec");

export const popupNewCard = document.querySelector(".popup_new-card");
export const popupFormNewCard = document.querySelector(".popup__form_new-card");
export const inputTitle = popupNewCard.querySelector(
  ".popup__input_type_title"
);
export const inputLink = popupNewCard.querySelector(".popup__input_type_link");

export const profileEditAvatarButton = document.querySelector(
  ".profile__edit-avatar"
);
export const profileAddButton = document.querySelector(".profile__add-button");
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);

export const popupCloseButton = document.querySelectorAll(
  ".popup__button-close"
);

export const validateSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
