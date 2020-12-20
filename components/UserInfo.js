export default class UserInfo{
    constructor({nameSelector, specSelector}){
        this._nameElement = document.querySelector(nameSelector);
        this._specElement = document.querySelector(specSelector);
    }
    getUserInfo(){
        const userName = this._nameElement.textContent;
        const userSpec = this._specElement.textContent;
        return {
            profileName: userName,
            profileSpec: userSpec
        }
    }
    setUserInfo({userName, userSpec}){
        this._nameElement.textContent = userName;
        this._specElement.textContent = userSpec;
    }
}

