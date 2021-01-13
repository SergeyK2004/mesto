import "./index.css";
import {
  validateSettings,
  popupFormProfile,
  popupFormAvatar,
  inputName,
  inputSpec,
  popupFormNewCard,
  profileAddButton,
  profileEditButton,
  profileEditAvatarButton,
} from "../utils/constants.js";

let thisUser = "";

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
    const buttonText = newPopupProfile.getButtonText();
    newPopupProfile.setButtonText("Сохранение..");
    api
      .setUserInfo(item)
      .then((res) => {
        userObject.setUserInfo({
          userName: res.name,
          userSpec: res.about,
        });
        newPopupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newPopupProfile.setButtonText(buttonText);
      });
  },
});

const newPopupAvatar = new PopupWithForm({
  formSelector: ".popup_avatar",
  handleFormSubmit: (item) => {
    const buttonText = newPopupAvatar.getButtonText();
    newPopupAvatar.setButtonText("Сохранение..");
    api
      .setUserAvatar(item)
      .then((res) => {
        userObject.setUserAvatar(res.avatar);
        newPopupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newPopupAvatar.setButtonText(buttonText);
      });
  },
});

const newPopupNewCard = new PopupWithForm({
  formSelector: ".popup_new-card",
  handleFormSubmit: (item) => {
    const buttonText = newPopupNewCard.getButtonText();
    newPopupNewCard.setButtonText("Сохранение..");
    api
      .setNewCard(item)
      .then((res) => {
        const cardElement = createCard(res);
        cardArray.addItem(cardElement, false);
        newPopupNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newPopupNewCard.setButtonText(buttonText);
      });
  },
});
const newPopupConfirm = new PopupWithForm({
  formSelector: ".popup_confirm",
  handleFormSubmit: (item) => {
    const buttonText = newPopupConfirm.getButtonText();
    newPopupConfirm.setButtonText("Удаление..");
    api
      .delCard(newPopupConfirm.cardObject)
      .then((res) => {
        newPopupConfirm.cardObject.deleteCard();
        newPopupConfirm.close();
        newPopupConfirm.cardObject = "";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newPopupConfirm.setButtonText(buttonText);
      });
  },
});

const userObject = new UserInfo({
  nameSelector: ".profile__name",
  specSelector: ".profile__spec",
  avatarSelector: ".profile__avatar-img",
});

function createCard(item) {
  return new Card({
    link: item.link,
    title: item.name,
    owner: item.owner._id,
    thisUser: thisUser,
    likes: item.likes,
    cardId: item._id,
    cardSelector: "#card",
    handleCardClick: (evt) => {
      const imageInf = {};
      imageInf.src = evt.target.src;
      imageInf.textContent = evt.target
        .closest(".element")
        .querySelector(".element__text").textContent;
      imagePopup.open(imageInf);
    },
    handleHeartClick: (likedCardId, deleteLike, cardObject) => {
      api
        .reverseLike(likedCardId, deleteLike)
        .then((res) => {
          cardObject.likesUpdate(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleTrashClick: (cardObject) => {
      newPopupConfirm.cardObject = cardObject;
      newPopupConfirm.open();
    },
  }).generateCard();
}

const profileValidator = new FormValidator(validateSettings, popupFormProfile);
const avatarValidator = new FormValidator(validateSettings, popupFormAvatar);

const newCardValidator = new FormValidator(validateSettings, popupFormNewCard);

function showPopupProfile(evt) {
  const myUser = userObject.getUserInfo();
  inputName.value = myUser.profileName;
  inputSpec.value = myUser.profileSpec;
  profileValidator.clearFormErrors();
  newPopupProfile.open();
}

function showPopupAvatar(evt) {
  avatarValidator.clearFormErrors();
  newPopupAvatar.open();
}

function showPopupNewCard() {
  popupFormNewCard.reset();
  newCardValidator.clearFormErrors();
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
// Изначально сделал эти два запроса друг за другом, они асонхронно и загружали все вместе,
// но не смог понять, где брать тогда id пользователя,
// чтобы при создании карточек понимать, где есть мусорная корзина, а где нет.
// И как-то не допетрил сперва просто сделать параллельно два запроса, спасибо за подсказку

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    thisUser = res[0]._id;
    userObject.setUserInfo({
      userName: res[0].name,
      userSpec: res[0].about,
    });
    userObject.setUserAvatar(res[0].avatar);
    cardArray.renderItems(res[1]);
  })
  .catch((err) => {
    console.log(err);
  });

profileEditButton.addEventListener("click", showPopupProfile);
profileAddButton.addEventListener("click", showPopupNewCard);
profileEditAvatarButton.addEventListener("click", showPopupAvatar);

profileValidator.enableValidation();
avatarValidator.enableValidation();
newCardValidator.enableValidation();
