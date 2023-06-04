export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector, avatarImgSelector, onAvatarClick  }) {
    this._nameElement = document.querySelector(nameSelector)
    this._infoElement = document.querySelector(infoSelector)
    this._avatarElement = document.querySelector(avatarSelector)
    this._avatarImgElement = document.querySelector(avatarImgSelector)

    // Если функция обратного вызова предоставлена, примените её для события 'click'
    if (onAvatarClick) {
      this._avatarElement.addEventListener('click', onAvatarClick);
    }
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      info: this._infoElement.textContent,
      id: this._id,
      avatarImg: this._avatarImgElement.src
    }
  }

  setUserInfo({ name, info, id }) {
    this._nameElement.textContent = name
    this._infoElement.textContent = info
    this._id = id
    // console.log('userId '+this._id)
  }

  setUserAvatar(avatarImg){
    this._avatarImgElement.src = avatarImg
  }
}
