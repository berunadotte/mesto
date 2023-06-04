import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
    this._formSubmitHandler = formSubmitHandler
    this._inputList = this._form.querySelectorAll('.popup__input')
  }

  _getInputValues() {
    this._formValues = {}
    const nameMapping = {
      'popup__card_name': 'name',
      'popup__image_link': 'link',
      'popup__name': 'name',
      'popup__job': 'job',
      'popup__avatar_link': 'link',
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
      // Получаем кнопку submit из формы
      const submitButton = this._form.querySelector('.submit-button');
      // Сохраняем исходный текст кнопки
      const originalButtonText = submitButton.textContent;
      // Меняем текст кнопки
      submitButton.textContent = 'Сохранение...';
      // Вызываем обработчик отправки формы
      this._formSubmitHandler(this._getInputValues())
        .finally(() => {
          // console.log('finally')
          // Возвращаем исходный текст кнопки после завершения обработки
          submitButton.textContent = originalButtonText;
        })
    })
  }
}
