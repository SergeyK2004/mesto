const popupProfile = document.querySelector(".popup_profile");
const popupNewCard = document.querySelector(".popup_new-card");
const popupImage = document.querySelector(".popup_image");
const popupFormProfile = document.querySelector(".popup__form_profile");
const popupFormNewCard = document.querySelector(".popup__form_new-card");
const popupCloseButton = document.querySelectorAll(".popup__button-close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileSpec = document.querySelector(".profile__spec");
const inputName = popupProfile.querySelector(".popup__input_type_name");
const inputSpec = popupProfile.querySelector(".popup__input_type_spec");
const inputTitle = popupNewCard.querySelector(".popup__input_type_title");
const inputLink = popupNewCard.querySelector(".popup__input_type_link");
const profileAddButton = document.querySelector(".profile__add-button");
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
  // evt.target.closest(".popup")
    popupElement.classList.remove("popup_opened");
}

function showPopupProfile(evt) {
  inputName.value = profileName.textContent;
  inputSpec.value = profileSpec.textContent;
  openPopup(popupProfile);
}

function showPopupImage(evt) {
   popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__image-title').textContent = evt.target.closest(".element").querySelector('.element__text').textContent;
  openPopup(popupImage);
}

function showPopupNewCard() {
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

  cardElement.querySelector('.element__image').src = imgLink;
  cardElement.querySelector('.element__image').addEventListener('click', showPopupImage);
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
  closePopup(evt.target.closest(".popup"));
  inputLink.value = '';
  inputTitle.value = '';
}

initialCards.forEach(item => addNewCard(createNewCard(item.name, item.link)));

profileEditButton.addEventListener("click", showPopupProfile);
profileAddButton.addEventListener("click", showPopupNewCard);
popupCloseButton.forEach((item) => {
  item.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});
popupFormProfile.addEventListener('submit', submitPopupProfile);
popupFormNewCard.addEventListener('submit', submitPopupNewCard);