// (export class FormValidator {
//   const domElements = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.submit-button',
//     inputErrorClass: 'popup__input_type_error',
//   }
  
//   _showInputError(formElement, inputElement, errorMessage, config) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
//     inputElement.classList.add(config.inputErrorClass)
//     errorElement.textContent = errorMessage
//   }
  
//   _hideInputError (formElement, inputElement, config) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
//     inputElement.classList.remove(config.inputErrorClass)
//     errorElement.textContent = ''
//   }
  
//   const _hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//       return !inputElement.validity.valid
//     })
//   }
  
//   const _toggleButtonState = (inputList, buttonElement) => {
//     if (hasInvalidInput(inputList)) {
//       buttonElement.setAttribute('disabled', true)
//     } else {
//       buttonElement.removeAttribute('disabled')
//     }
//   }
  
//   const _checkInputValidity = (formElement, inputElement, config) => {
//     if (!inputElement.validity.valid) {
//       showInputError(
//         formElement,
//         inputElement,
//         inputElement.validationMessage,
//         config
//       )
//     } else {
//       hideInputError(formElement, inputElement, config)
//     }
//   }
  
//   const enableValidation = (config) => {
//     const formList = Array.from(document.querySelectorAll(config.formSelector))
//     formList.forEach((formElement) => {
//       formElement.addEventListener('submit', (evt) => {
//         evt.preventDefault()
//       })
//       setEventListeners(formElement, config)
//     })
//   }
  
//   const _setEventListeners = (formElement, config) => {
//     const inputList = Array.from(
//       formElement.querySelectorAll(config.inputSelector)
//     )
//     const buttonElement = formElement.querySelector(config.submitButtonSelector)
//     toggleButtonState(inputList, buttonElement)
//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', function () {
//         checkInputValidity(formElement, inputElement, config)
//         toggleButtonState(inputList, buttonElement)
//       })
//     })
//   }
  
//   enableValidation(domElements)
  
// })()