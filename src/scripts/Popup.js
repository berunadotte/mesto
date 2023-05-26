export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    this._popup.classList.add('popup_opened')
  }

  close() {
    this._popup.classList.remove('popup_opened')
  }

  _handleEscClose() {
    if (evt.key === 'Escape') {
      this.close(document.querySelector('.popup_opened'))
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        this.close()
      }
    })
  }
}
