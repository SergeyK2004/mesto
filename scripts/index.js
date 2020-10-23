const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form");
const popupCloseButton = document.querySelector(".popup__button-close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileSpec = document.querySelector(".profile__spec");

function showPopup() {
  let nameVal = profileName.textContent;
  let specVal = profileSpec.textContent;
  document.querySelector(".popup__input_type_name").value = nameVal;
  document.querySelector(".popup__input_type_spec").value = specVal;
  
  // console.log(nameVal);
  popup.classList.add("popup__opened");
}

function closePopup() {
  popup.classList.remove("popup__opened");
}

function submitPopup(evt) {
  evt.preventDefault();
  let newName = document.querySelector(".popup__input_type_name").value.trim();
  let newSpec = document.querySelector(".popup__input_type_spec").value.trim();
  // Проверим заполнены ли поля
  if (newName.length === 0 || newSpec.length === 0) {
    alert("Необходимо заполнить все поля!");
  }
  else {
    profileName.textContent = newName;
    profileSpec.textContent = newSpec;
    popup.classList.remove("popup__opened");
  }
}

function popupClickHandler(evt) {
  console.log(evt.target.classList);
  if (evt.target.classList.contains("popup")) {
     popup.classList.remove("popup__opened");
  
  }
}

profileEditButton.addEventListener("click", showPopup);
popupCloseButton.addEventListener("click", closePopup);
popupForm.addEventListener('submit', submitPopup);
popup.addEventListener('click', popupClickHandler);