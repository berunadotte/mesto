import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  open(src, caption) {
    const image = this._popup.querySelector('.popup__image')
    const imageCaption = this._popup.querySelector('.popup__image-label')

    image.src = src
    image.alt = caption
    imageCaption.textContent = caption

    super.open()
  }
}
