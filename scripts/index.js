const popupProfile = document.querySelector(".popup_profile");
const popupNewCard = document.querySelector(".popup_new-card");
const popupFormProfile = document.querySelector(".popup__form_profile");
const popupFormNewCard = document.querySelector(".popup__form_new-card");
const popupCloseButton = document.querySelectorAll(".popup__button-close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileSpec = document.querySelector(".profile__spec");
const inputName = document.querySelector(".popup__input_type_name");
const inputSpec = document.querySelector(".popup__input_type_spec");
const inputTitle = document.querySelector(".popup__input_type_title");
const inputLink = document.querySelector(".popup__input_type_link");
const profileAddButton = document.querySelector(".profile__add-button");
const cardList = document.querySelector(".elements__list");

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

function showPopupProfile(evt) {
  inputName.value = profileName.textContent;
  inputSpec.value = profileSpec.textContent;
  // console.log(popupProfile.classList[0]);
  popupProfile.classList.add("popup_opened");
  // evt.target.closest('popup').style.display = 'none';
}
function showPopupNewCard() {
  popupNewCard.classList.add("popup_opened");
}

function closePopup(evt) {

  evt.target.closest(".popup").classList.remove("popup_opened");
}

function submitPopupProfile(evt) {
 evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSpec.textContent = inputSpec.value;
  closePopup(evt);
}

function deleteCard(evt){
evt.target.closest("li").remove();
}

function addNewCard(title, imgLink, method='append') {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);

cardElement.querySelector('.element__image').src = imgLink;
cardElement.querySelector('.element__text').textContent = title;
cardElement.querySelector('.element__heart').addEventListener('click', function (evt) {
  evt.target.src = (evt.target.src.includes("-black.svg") ? "./images/heart.svg" : "./images/heart-black.svg");
});

cardElement.querySelector('.element__trash').addEventListener('click', deleteCard);

if (method === 'append'){
  cardList.append(cardElement);
}
else {
  cardList.prepend(cardElement);
}


}

function submitPopupNewCard(evt) {
  evt.preventDefault();
  addNewCard(inputTitle.value, inputLink.value, 'prepend');
  closePopup(evt);
  inputLink.value = '';
  inputTitle.value = '';
}

initialCards.forEach(item => addNewCard(item.name, item.link));

profileEditButton.addEventListener("click", showPopupProfile);
profileAddButton.addEventListener("click", showPopupNewCard);
popupCloseButton.forEach((item) => {
  item.addEventListener("click", closePopup);
});
popupFormProfile.addEventListener('submit', submitPopupProfile);
popupFormNewCard.addEventListener('submit', submitPopupNewCard);