import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector)
    this._submiter = submiter
    this._inputList = Array.from(document.querySelectorAll('.popup__input'))
    this._inputValues = {}
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      const inputName = input.getAttribute('name')
      this._inputValues[inputName] = input.value
    })
    // console.log(inputValues.popup__image_link)
    // console.log(inputValues.popup__card_name)
    // console.log(inputValues.popup__name)
    // console.log(inputValues.popup__job)
    console.log(this._inputValues)    
  }

  setEventListeners() {
    super.setEventListeners
    this._getInputValues
    super._popup.addEventListener('submit', this._submiter)
  }

  close() {

  }

}