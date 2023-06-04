import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._image = document
      .querySelector(popupSelector)
      .querySelector('.popup__image')
    this._imageCaption = document
      .querySelector(popupSelector)
      .querySelector('.popup__image-label')
  }
  open(src, caption) {
    this._image.src = src
    this._image.alt = caption
    this._imageCaption.textContent = caption

    super.open()
  }
}
