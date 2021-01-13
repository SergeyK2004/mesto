export default class UserInfo {
  constructor({ nameSelector, specSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._specElement = document.querySelector(specSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      profileName: this._nameElement.textContent,
      profileSpec: this._specElement.textContent,
    };
  }
  setUserInfo({ userName, userSpec }) {
    this._nameElement.textContent = userName;
    this._specElement.textContent = userSpec;
  }
  setUserAvatar(userAvatar) {
    this._avatarElement.src = userAvatar;
  }
}
