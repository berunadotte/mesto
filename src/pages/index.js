import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import { profileEditButton, nameInput, jobInput, cardTemplate, buttonAddCard, selectors } from '../utils/constants.js'
import Popup from '../components/Popup.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'
import './index.css'
import Api from '../components/Api.js'
// import PopupConfirmationDelete from '../components/PopupConfirmationDelete.js'


const cardSection = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item)
      cardSection.addItem(cardElement)
    },
  },
  selectors.cardsList
)

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
  yandexApi.changeNameAndInfo(data.name, data.job)
  popupProfile.close()
})
popupProfile.setEventListeners()

const popupWithImage = new PopupWithImage(selectors.popupImage)
popupWithImage.setEventListeners()

const popupAddCard = new PopupWithForm(selectors.popupNewCard, (data) => {
  const newCard = createCard(data)
  yandexApi.addNewCardToServer(data)
  cardSection.addItemToStart(newCard)
  popupAddCard.close()
})
popupAddCard.setEventListeners()

buttonAddCard.addEventListener('click', () => {
  popupAddCard.open()
  formValidators[selectors.popupFormNewCard].resetValidation()
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



//==============================================================================================================

const yandexApi = new Api()

yandexApi.loadNameAndInfo((result) => {
  const name = result.name
  const info = result.about
  userInfo.setUserInfo({ name, info})
})

yandexApi.getInitialCards((arrCards) => {
cardSection.renderItems(arrCards)
})

// const popupDeletingCard = new PopupConfirmationDelete(selectors.popupDeletingCard, (() => {
//   popupDeletingCard.setEventListeners()
// }))

// popupDeletingCard.open()
// popupDeletingCard.setEventListeners()