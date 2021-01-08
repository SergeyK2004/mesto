import "./index.css";
import {
  validateSettings,
  initialCards,
  popupFormProfile,
  inputName,
  inputSpec,
  popupFormNewCard,
  profileAddButton,
  profileEditButton,
} from "../utils/constants.js";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const imagePopup = new PopupWithImage(".popup_image");

const newPopupProfile = new PopupWithForm({
  formSelector: ".popup_profile",
  handleFormSubmit: (item) => {
    userObject.setUserInfo({
      userName: item.name,
      userSpec: item.spec,
    });
  },
});

const userObject = new UserInfo({
  nameSelector: ".profile__name",
  specSelector: ".profile__spec",
  avatarSelector: ".profile__avatar",
});

function createCard(item) {
  return new Card({
    link: item.link,
    title: item.title,
    cardSelector: "#card",
    handleCardClick: (evt) => {
      const imageInf = {};
      imageInf.src = evt.target.src;
      imageInf.textContent = evt.target
        .closest(".element")
        .querySelector(".element__text").textContent;
      imagePopup.open(imageInf);
    },
  }).generateCard();
}

const newPopupNewCard = new PopupWithForm({
  formSelector: ".popup_new-card",
  handleFormSubmit: (item) => {
    const cardElement = createCard(item);
    cardArray.addItem(cardElement, false);
  },
});

const profileValidator = new FormValidator(validateSettings, popupFormProfile);

const newCardValidator = new FormValidator(validateSettings, popupFormNewCard);

function showPopupProfile(evt) {
  const myUser = userObject.getUserInfo();
  inputName.value = myUser.profileName;
  inputSpec.value = myUser.profileSpec;
  profileValidator.enableValidation(true);
  newPopupProfile.open();
}

function showPopupNewCard() {
  popupFormNewCard.reset();
  newCardValidator.enableValidation(true);
  newPopupNewCard.open();
}

const cardArray = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardArray.addItem(cardElement, true);
    },
  },
  ".elements__list"
);

function getUserFromServer() {
  fetch("https://mesto.nomoreparties.co/v1/cohort-19/users/me", {
    headers: {
      authorization: "d1e1c4f1-84e7-4d89-bcad-9b9b9cbdb035",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      userObject.setUserInfo({
        userName: res.name,
        userSpec: res.about,
      });
      userObject.setUserAvatar(res.avatar);
    })
    .catch((err) => {
      console.log(err);
    });
}

cardArray.renderItems();

getUserFromServer();

profileEditButton.addEventListener("click", showPopupProfile);
profileAddButton.addEventListener("click", showPopupNewCard);

profileValidator.enableValidation(false);
newCardValidator.enableValidation(false);
