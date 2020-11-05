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


function showPopupProfile() {
  inputName.value = profileName.textContent;
  inputSpec.value = profileSpec.textContent;
  popupProfile.classList.add("popup_opened");
}
function showPopupNewCard() {
  popupNewCard.classList.add("popup_opened");
}

function closePopup(evt) {
  evt.currentTarget.parentElement.parentElement.classList.remove("popup_opened");
}

function submitPopupProfile(evt) {
 evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSpec.textContent = inputSpec.value;
  closePopup(evt);
}
function submitPopupNewCard(evt) {
  evt.preventDefault();
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);

// наполняем содержимым
cardElement.querySelector('.element__image').src = inputLink.value;
cardElement.querySelector('.element__text').textContent = inputTitle.value;

// отображаем на странице
  cardList.prepend(cardElement); 
  inputLink.value = '';
  inputTitle.value = '';
  closePopup(evt);
}

profileEditButton.addEventListener("click", showPopupProfile);
profileAddButton.addEventListener("click", showPopupNewCard);
popupCloseButton.forEach((item) => {
  item.addEventListener("click", closePopup);
});
popupFormProfile.addEventListener('submit', submitPopupProfile);
popupFormNewCard.addEventListener('submit', submitPopupNewCard);