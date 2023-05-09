import Card from './Card.js'
import { initialCards } from './constants.js'

const cardsList = document.querySelector('.cards__list')
const popupOverlays = document.querySelectorAll('.popup')
const buttonsClose = document.querySelectorAll('.popup__close-button')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditProfileWindow = document.querySelector('.popup_edit-profile')
const profileEditFormElement = document.querySelector('.popup__form_edit-profile')
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

export const popupNewCardSubmitButton = document.querySelector('.popup__create-button')
export const popupFullscreenImage = document.querySelector('.popup_image')
export const popupImage = document.querySelector('.popup__image')
export const popupImageLabel = document.querySelector('.popup__image-label')

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closedByEscape)
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closedByEscape)
}

const openEditProfile = () => {
  // открытие попапа по нажатию на кнопку редактирования
  popupEditProfileSubmitButton.removeAttribute('disabled')
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

buttonsClose.forEach((closeBtn) => {
  closeBtn.addEventListener('click', (evt) => {
    const target = evt.target.closest('.popup')
    closePopup(target)
  })
})

profileEditButton.addEventListener('click', openEditProfile)

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddingCardWindow)
  newCardFormElement.reset()
})

profileEditFormElement.addEventListener('submit', submitProfileEdit)

function addNewCard(evt) {
  evt.preventDefault()
  const newCardData = {name: cardNameInput.value, link: cardLinkInput.value}
  const newCard = new Card (newCardData)
  cardsList.prepend(newCard.createCard())
  popupNewCardSubmitButton.setAttribute('disabled', true)
  closePopup(popupAddingCardWindow)
  newCardFormElement.reset()
}

newCardFormElement.addEventListener('submit', addNewCard)

const closeOverlay = (evt) => {
  if ((evt.target === evt.currentTarget)) {
    closePopup(evt.target)
  }
}

popupOverlays.forEach((overlay) => {
  overlay.addEventListener('click', closeOverlay)
})

function closedByEscape(evt) {
  if (evt.key === 'Escape') {
  const openedPopup = document.querySelector('.popup_opened')
  closePopup(openedPopup)
  }
}

initialCards.forEach((arrCardsElement) => {
  const newCard = new Card (arrCardsElement)
  cardsList.append(newCard.createCard())
})

