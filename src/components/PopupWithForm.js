import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
    this._formSubmitHandler = formSubmitHandler
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input')
    this._formValues = {}
    const nameMapping = {
      'popup__card-name': 'name',
      'popup__image-link': 'link',
      'popup__name': 'name',
      'popup__job': 'job',
    }

    this._inputList.forEach((input) => {
      const mappedName = nameMapping[input.name] || input.name
      this._formValues[mappedName] = input.value
    })

    return this._formValues
  }

  close() {
    super.close()
    this._form.reset()
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._formSubmitHandler(this._getInputValues())
      this.close()
    })
  }
}
