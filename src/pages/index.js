import Card from '../components/Card.js'
import FormValidator from '../FormValidator.js'
import { initialCards } from '../constants.js'
import PopupWithForm from '../PopupWithForm.js'
import PopupWithImage from '../PopupWithImage.js'
import UserInfo from '../UserInfo.js'
import Section from '../Section.js'
import './pages/index.css'

const addButtonImage = new URL('./images/add_button_image.svg', import.meta.url)
const deleteButtonImage = new URL('./images/delete-button_icon.svg', import.meta.url)
const activeLikeButtonImage = new URL('./images/like_button_active.svg', import.meta.url)
const editButtonImage = new URL('./images/profile__edit-button.svg', import.meta.url)

const images = [
  { name: 'add_button_image', image: addButtonImage },
  { name: 'delete-button_icon', link: deleteButtonImage },
  { name: 'like_button_active', link: activeLikeButtonImage },
  { name: 'profile__edit', link: editButtonImage },
]

const selectors = {
  cardsList: '.cards__list',
  profileEditButton: '.profile__edit-button',
  popupEditProfile: '.popup_edit-profile',
  buttonAddCard: '.profile__add-button',
  popupNewCard: '.popup_new-card',
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
  popupInputNameValue: '.popup__input_name-value',
  popupInputJobValue: '.popup__input_job-value',
  cardTemplate: '.cards__template',
  popupFormEditProfile: 'popup__form_edit-profile',
  popupFormNewCard: 'popup__form_new-card',
  popupImage: '.popup_image',
}

const profileEditButton = document.querySelector(selectors.profileEditButton)
const nameInput = document.querySelector(selectors.popupInputNameValue)
const jobInput = document.querySelector(selectors.popupInputJobValue)
const cardTemplate = document.querySelector(selectors.cardTemplate).content
const buttonAddCard = document.querySelector(selectors.buttonAddCard)

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item)
      cardSection.addItem(cardElement)
    },
  },
  selectors.cardsList
)
cardSection.renderItems()

function createCard(cardData) {
  const newCard = new Card(cardData, cardTemplate, (name, link) => {
    popupWithImage.open(link, name)
  })
  const cardElement = newCard.createCard()
  return cardElement
}

const userInfo = new UserInfo({
  nameSelector: selectors.profileTitle,
  infoSelector: selectors.profileSubtitle,
})

const openEditProfile = () => {
  const currentUserInfo = userInfo.getUserInfo()
  nameInput.value = currentUserInfo.name
  jobInput.value = currentUserInfo.info
  formValidators[selectors.popupFormEditProfile].resetValidation()
  popupProfile.open()
}

profileEditButton.addEventListener('click', openEditProfile)

const popupProfile = new PopupWithForm(selectors.popupEditProfile, (data) => {
  userInfo.setUserInfo({
    name: data.name,
    info: data.job,
  })
})
popupProfile.setEventListeners()

const popupWithImage = new PopupWithImage(selectors.popupImage)
popupWithImage.setEventListeners()

const popupAddCard = new PopupWithForm(selectors.popupNewCard, (data) => {
  const newCard = createCard(data)
  cardSection.addItem(newCard)
})
popupAddCard.setEventListeners()

buttonAddCard.addEventListener('click', () => {
  popupAddCard.open()
})

const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.submit-button',
  inputErrorClass: 'popup__input_type_error',
  formSelector: '.popup__form',
}

const formValidators = {}

function enableFormValidation() {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator
    validator.enableValidation()
  })
}

enableFormValidation()
