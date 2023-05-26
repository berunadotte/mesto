import Card from './Card.js'
import FormValidator from './FormValidator.js'
import { initialCards } from './constants.js'
import PopupWithForm from './PopupWithForm.js'

const cardsList = document.querySelector('.cards__list')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditProfileWindow = document.querySelector('.popup_edit-profile')
const buttonAddCard = document.querySelector('.profile__add-button')
const popupAddingCardWindow = document.querySelector('.popup_new-card')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const nameInput = document.querySelector('.popup__input_name-value')
const jobInput = document.querySelector('.popup__input_job-value')
const cardNameInput = document.querySelector('.popup__input_card-name-value')
const cardLinkInput = document.querySelector('.popup__input_image-link-value')
const popupFullscreenImage = document.querySelector('.popup_image')
const popupImage = document.querySelector('.popup__image')
const popupImageLabel = document.querySelector('.popup__image-label')
const cardSelector = document.querySelector('.cards__template').content
const formEditProfile = document.forms['popup__form_edit-profile']
const formAddNewCard = document.forms['popup__form_new-card']
const popups = document.querySelectorAll('.popup')

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closedByEscape)
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closedByEscape)
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup)
      }
  })
})

function closedByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

const openEditProfile = () => {
  // открытие попапа по нажатию на кнопку редактирования
  formValidators['popup__form_edit-profile'].resetValidation()
  openPopup(popupEditProfileWindow)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  // присваивание текстовых значений атрибуту value форм ввода данных пользователем
}

const submitProfileEdit = (evt) => {
  evt.preventDefault()
  // перехватывает действие по умолчанию при нажатии кнопки сохранить
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  // записывает значения введенные в форме пользователем в соответствующие текстовые значения элементов DOM дерева
  closePopup(popupEditProfileWindow)
  // вызов функции закрытия формы
}

function createCard(config) {
  const newCard = new Card(config, cardSelector, handleCardClick)
  const cardElement = newCard.createCard()
  return cardElement
}

function addNewCard(evt) {
  const newCardData = { name: cardNameInput.value, link: cardLinkInput.value }
  evt.preventDefault()
  cardsList.prepend(createCard(newCardData))
  closePopup(popupAddingCardWindow)
  formAddNewCard.reset()
  formValidators['popup__form_new-card'].resetValidation()
}

initialCards.forEach((card) => {
  const cardFromObj = createCard(card)
  cardsList.append(cardFromObj)
})

function handleCardClick(name, link) {
  popupImage.src = link
  popupImage.alt = name
  popupImageLabel.textContent = name
  openPopup(popupFullscreenImage)
}

formAddNewCard.addEventListener('submit', addNewCard)
profileEditButton.addEventListener('click', openEditProfile)
formEditProfile.addEventListener('submit', submitProfileEdit)
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddingCardWindow)
})




const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.submit-button',
  inputErrorClass: 'popup__input_type_error',
  formSelector: '.popup__form'
}

const formValidators = { }

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);


const addCardPopup = new PopupWithForm ('.popup_new-card', () => {

})

const editProfilePopup = new PopupWithForm ('.popup_edit-profile', () => {
  evt.preventDefault()
  profileName.textContent = editProfilePopup.inputValues.popup__name
  profileJob.textContent = editProfilePopup.inputValues.popup__job
  editProfilePopup.close()
})

