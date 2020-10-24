const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form");
const popupCloseButton = document.querySelector(".popup__button-close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileSpec = document.querySelector(".profile__spec");
const inputName = document.querySelector(".popup__input_type_name");
const inputSpec = document.querySelector(".popup__input_type_spec");

function showPopup() {
  inputName.value = profileName.textContent;
  inputSpec.value = profileSpec.textContent;
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function submitPopup(evt) {
  // убрал свою проверку на пустые поля.
  // поставил реквизит обязательного поля в input 
  // теперь можно красиво выделить текст, случайно нажать пробел и сохранить.
  // чем это лучше я не знаю, но лучше никакой отсебятины, это я понял.

  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSpec.textContent = inputSpec.value;
  closePopup();
}

profileEditButton.addEventListener("click", showPopup);
popupCloseButton.addEventListener("click", closePopup);
popupForm.addEventListener('submit', submitPopup);