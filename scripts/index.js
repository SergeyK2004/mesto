const popupProfile = document.querySelector(".popup_profile");
const popupFormProfile = document.querySelector(".popup__form_profile");

const popupNewCard = document.querySelector(".popup_new-card");
const popupFormNewCard = document.querySelector(".popup__form_new-card");

const popupImage = document.querySelector(".popup_image");
const popupImagePhoto = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');

const popupCloseButton = document.querySelectorAll(".popup__button-close");
const allPopupWindows = document.querySelectorAll(".popup");
const profileName = document.querySelector(".profile__name");
const profileSpec = document.querySelector(".profile__spec");
const inputName = popupProfile.querySelector(".popup__input_type_name");
const inputSpec = popupProfile.querySelector(".popup__input_type_spec");
const inputTitle = popupNewCard.querySelector(".popup__input_type_title");
const inputLink = popupNewCard.querySelector(".popup__input_type_link");

// const profileAddButton = document.querySelector(".profile__add-button");
const cardList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector('#card').content;

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
}

function showPopupProfile(evt) {
  inputName.value = profileName.textContent;
  inputSpec.value = profileSpec.textContent;
  openPopup(popupProfile);
 }

function showPopupImage(evt) {
  popupImagePhoto.src = evt.target.src;
  popupImageTitle.textContent = evt.target.closest(".element").querySelector('.element__text').textContent;
  openPopup(popupImage);
}

function showPopupNewCard() {
  popupFormNewCard.reset();
  openPopup(popupNewCard);
}


function submitPopupProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSpec.textContent = inputSpec.value;
  closePopup(evt.target.closest(".popup"));
}

function deleteCard(evt){
  evt.target.closest(".element").remove();
}

function createNewCard(title, imgLink) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPhoto = cardElement.querySelector('.element__image');
  cardPhoto.src = imgLink;
  cardPhoto.addEventListener('click', showPopupImage);
  cardElement.querySelector('.element__text').textContent = title;
  cardElement.querySelector('.element__heart').addEventListener('click', (evt) => evt.target.classList.toggle('element__heart_active'));
  cardElement.querySelector('.element__trash').addEventListener('click', deleteCard);

  return cardElement;
}

  function addNewCard(cardElement, method = 'append') {
    if (method === 'append') {
      cardList.append(cardElement);
    }
    else {
      cardList.prepend(cardElement);
    }
  }

function submitPopupNewCard(evt) {
  evt.preventDefault();
  addNewCard(createNewCard(inputTitle.value, inputLink.value), 'prepend');
  evt.target.reset();
  closePopup(evt.target.closest(".popup"));

}

initialCards.forEach(item => addNewCard(createNewCard(item.name, item.link)));

inputName.value = profileName.textContent;
inputSpec.value = profileSpec.textContent;


function documentClickHandler(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target.closest(".popup"));
  }
  else if (evt.target.classList.contains("profile__edit-button") || evt.target.classList.contains("profile__edit-button-img")) {
    showPopupProfile(evt);
  }
  else if (evt.target.classList.contains("profile__add-button") || evt.target.classList.contains("profile__add-button-img")) {
    showPopupNewCard(evt);
  }
}

document.addEventListener('click', documentClickHandler);
popupCloseButton.forEach((item) => {
  item.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});
popupFormProfile.addEventListener('submit', submitPopupProfile);
popupFormNewCard.addEventListener('submit', submitPopupNewCard);

document.addEventListener("keydown", (evt) => {
  if (evt.key === 'Escape'){
    activPopup = document.querySelector(".popup_opened");
    if (activPopup != null){
      evt.preventDefault();
      closePopup(activPopup);
    }
  }
});