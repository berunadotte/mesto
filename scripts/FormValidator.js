export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inputErrorClass = config.inputErrorClass
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    this._buttonElement = formElement.querySelector(this._submitButtonSelector)
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners()
  }

  _setEventListeners() {
    // const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true)
    } else {
      this._buttonElement.removeAttribute('disabled')
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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }
}
