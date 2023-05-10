import Card from './Card.js'
import FormValidator from './FormValidator.js'
import { initialCards } from './constants.js'

const cardsList = document.querySelector('.cards__list')
const popupsOverlays = document.querySelectorAll('.popup')
const closeButtons = document.querySelectorAll('.popup__close-button')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditProfileWindow = document.querySelector('.popup_edit-profile')
const buttonAddCard = document.querySelector('.profile__add-button')
const popupAddingCardWindow = document.querySelector('.popup_new-card')
const newCardFormElement = document.querySelector('.popup__form_new-card')
const popupEditProfileSubmitButton = document.querySelector('.popup__save-button')
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

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closedByEscape)
  newCardForm.resetValidation()
  editProfileForm.resetValidation()
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closedByEscape)
}

closeButtons.forEach((closeBtn) => {
  closeBtn.addEventListener('click', (evt) => {
    const target = evt.target.closest('.popup')
    closePopup(target)
  })
})

const closeOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

popupsOverlays.forEach((overlay) => {
  overlay.addEventListener('click', closeOverlay)
})

function closedByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

const openEditProfile = () => {
  // открытие попапа по нажатию на кнопку редактирования
  // popupEditProfileSubmitButton.removeAttribute('disabled')
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

function createCard() {
  const newCardData = { name: cardNameInput.value, link: cardLinkInput.value }
  const newCard = new Card(newCardData, cardSelector, handleCardClick)
  const cardElement = newCard.createCard()
  return cardElement
}

function addNewCard(evt) {
  evt.preventDefault()
  cardsList.prepend(createCard())
  closePopup(popupAddingCardWindow)
  newCardFormElement.reset()
}

initialCards.forEach((arrCardsElement) => {
  const newCard = new Card(arrCardsElement, cardSelector, handleCardClick)
  cardsList.append(newCard.createCard())
})

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.submit-button',
  inputErrorClass: 'popup__input_type_error',
}

function handleCardClick(name, link) {
  popupImage.src = link
  popupImage.alt = name
  popupImageLabel.textContent = name
  openPopup(popupFullscreenImage)
}

newCardFormElement.addEventListener('submit', addNewCard)
profileEditButton.addEventListener('click', openEditProfile)
formEditProfile.addEventListener('submit', submitProfileEdit)
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddingCardWindow)
  newCardFormElement.reset()
})

const newCardForm = new FormValidator(validationConfig, formAddNewCard)
const editProfileForm = new FormValidator(validationConfig, formEditProfile)
newCardForm.enableValidation()
editProfileForm.enableValidation()