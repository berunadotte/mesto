export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inputErrorClass = config.inputErrorClass
  }

  enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()})
      this._setEventListeners()
    }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    this._toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',() => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(inputList, buttonElement)
      })
    })
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
      )
    } else {
      this._hideInputError(inputElement)
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.removeAttribute('disabled')
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = errorMessage
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.textContent = ''
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
}







