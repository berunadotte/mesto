import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (name, link) {
    this._popupImage = document.querySelector('.popup__image')
    this._popupImageLabel = document.querySelector('.popup__image-label')
    this._name = name
    this._link = link
  }

  open() {
    this._popupImage.src = this._link
    this._popupImage.alt = this._name
    this._popupImageLabel.textContent = this._name
    super.open()
  }
}