export default class UserInfo {
  constructor({ nameSelector, specSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._specElement = document.querySelector(specSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const userName = this._nameElement.textContent;
    const userSpec = this._specElement.textContent;
    return {
      profileName: userName,
      profileSpec: userSpec,
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
