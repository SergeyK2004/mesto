import "./index.css";
import {
  validateSettings,
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
import { Api } from "../components/Api";

const imagePopup = new PopupWithImage(".popup_image");

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19/",
  headers: {
    authorization: "d1e1c4f1-84e7-4d89-bcad-9b9b9cbdb035",
    "Content-Type": "application/json",
  },
});

const newPopupProfile = new PopupWithForm({
  formSelector: ".popup_profile",
  handleFormSubmit: (item) => {
    api
      .setUserInfo(item)
      .then((res) => {
        userObject.setUserInfo({
          userName: res.name,
          userSpec: res.about,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const newPopupNewCard = new PopupWithForm({
  formSelector: ".popup_new-card",
  handleFormSubmit: (item) => {
    const cardElement = createCard(item);
    cardArray.addItem(cardElement, false);
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
    title: item.name,
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
    renderer: (item) => {
      const cardElement = createCard(item);
      cardArray.addItem(cardElement, true);
    },
  },
  ".elements__list"
);

api
  .getInitialCards()
  .then((res) => {
    cardArray.renderItems(res);
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUserInfo()
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

profileEditButton.addEventListener("click", showPopupProfile);
profileAddButton.addEventListener("click", showPopupNewCard);

profileValidator.enableValidation(false);
newCardValidator.enableValidation(false);
