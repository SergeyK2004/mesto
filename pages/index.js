export const popupProfile = document.querySelector(".popup_profile");
export const popupFormProfile = document.querySelector(".popup__form_profile");
export const inputName = popupProfile.querySelector(".popup__input_type_name");
export const inputSpec = popupProfile.querySelector(".popup__input_type_spec");

export const popupNewCard = document.querySelector(".popup_new-card");
export const popupFormNewCard = document.querySelector(".popup__form_new-card");
export const inputTitle = popupNewCard.querySelector(".popup__input_type_title");
export const inputLink = popupNewCard.querySelector(".popup__input_type_link");

export const popupImage = document.querySelector(".popup_image");
export const popupImagePhoto = popupImage.querySelector(".popup__image");
export const popupImageTitle = popupImage.querySelector(".popup__image-title");

export const profileAddButton = document.querySelector(".profile__add-button");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileName = document.querySelector(".profile__name");
export const profileSpec = document.querySelector(".profile__spec");

export const popupCloseButton = document.querySelectorAll(".popup__button-close");
export const cardList = document.querySelector(".elements__list");

export const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validateSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

import Section from "../components/Section.js"
import { FormValidator } from "../components/validate.js";

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", documentKeydownHandler);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", documentKeydownHandler);
}

function closeActivPopup(evt) {
  const activPopup = document.querySelector(".popup_opened");
  if (activPopup != null) {
    evt.preventDefault();
    closePopup(activPopup);
  }
}
function showPopupProfile(evt) {
  inputName.value = profileName.textContent;
  inputSpec.value = profileSpec.textContent;
  new FormValidator(
    validateSettings,
    popupFormProfile,
    true
  ).enableValidation();
  openPopup(popupProfile);
}

function showPopupImage(evt) {
  popupImagePhoto.src = evt.target.src;
  popupImageTitle.textContent = evt.target
    .closest(".element")
    .querySelector(".element__text").textContent;
  openPopup(popupImage);
}

function showPopupNewCard() {
  popupFormNewCard.reset();
  new FormValidator(
    validateSettings,
    popupFormNewCard,
    true
  ).enableValidation();
  openPopup(popupNewCard);
}

function submitPopupProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSpec.textContent = inputSpec.value;
  closePopup(evt.target.closest(".popup"));
}


function addNewCard(cardElement, method = "append") {
  if (method === "append") {
    cardList.append(cardElement);
  } else {
    cardList.prepend(cardElement);
  }
}

function submitPopupNewCard(evt) {
  evt.preventDefault();
  addNewCard(createNewCard(inputTitle.value, inputLink.value), "prepend");
  evt.target.reset();
  closePopup(evt.target.closest(".popup"));
}

// initialCards.forEach((item) => addNewCard(createNewCard(item.name, item.link)));
const cardMass = new Section({
  items: initialCards
}, ".elements__list");

cardMass.renderItems();

function documentKeydownHandler(evt) {
  if (evt.key === "Escape") {
    closeActivPopup(evt);
  }
}

function popupClickHandler(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target.closest(".popup"));
  }
}

profileEditButton.addEventListener("click", showPopupProfile);
profileAddButton.addEventListener("click", showPopupNewCard);
popupProfile.addEventListener("click", popupClickHandler);
popupNewCard.addEventListener("click", popupClickHandler);
popupImage.addEventListener("click", popupClickHandler);
popupCloseButton.forEach((item) => {
  item.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});
popupFormProfile.addEventListener("submit", submitPopupProfile);
new FormValidator(validateSettings, popupFormProfile).enableValidation();

popupFormNewCard.addEventListener("submit", submitPopupNewCard);
new FormValidator(validateSettings, popupFormNewCard).enableValidation();
