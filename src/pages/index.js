import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import {
  profileEditButton,
  nameInput,
  jobInput,
  cardTemplate,
  buttonAddCard,
  selectors,
  validationConfig,
  apiOptions,
} from '../utils/constants.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'
import './index.css'
import Api from '../components/Api.js'
import PopupConfirmationDelete from '../components/PopupConfirmationDelete.js'

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
  const newCard = new Card(
    cardData,
    cardTemplate,
    (name, link) => 
    { popupWithImage.open(link, name)},
    popupDeletingCard,
    (card) => { return userInfo.id === card._ownerId},
    (card) => {
      if (card.isLiked)
        yandexApi
          .removeLike(card.id)
          .then((data) => {
            card.updateLikes(data, userInfo.id)
          })
          .catch((err) => {
            console.log(err)
          })
      else
        yandexApi
          .addLike(card.id)
          .then((data) => {
            card.updateLikes(data, userInfo.id)
          })
          .catch((err) => {
            console.log(err)
          })
    }
  )
  const cardElement = newCard.createCard(userInfo.id)
  return cardElement
}

const userInfo = new UserInfo({
  nameSelector: selectors.profileTitle,
  infoSelector: selectors.profileSubtitle,
  avatarSelector: selectors.profileAvatar,
  avatarImgSelector: selectors.profileAvatarImg,
  onAvatarClick: () => {
    popupUpdateAvatar.open()
    formValidators[selectors.popupFormUpdateAvatar].resetValidation()
  },
})

const openEditProfile = () => {
  const currentUserInfo = userInfo.getUserInfo()
  nameInput.value = currentUserInfo.name
  jobInput.value = currentUserInfo.info
  formValidators[selectors.popupFormEditProfile].resetValidation()
  popupProfile.open()
}

profileEditButton.addEventListener('click', openEditProfile)

const popupProfile = new PopupWithForm(selectors.popupEditProfile, (data, callback) => {
  userInfo.setUserInfo({
    name: data.name,
    info: data.job,
  })

  return yandexApi
    .changeNameAndInfo(data.name, data.job)
    .then((result) => {
      popupProfile.close()
      callback()
    })
    .catch((err) => {
      console.log(err)
      callback()
    })
})
popupProfile.setEventListeners()

const popupWithImage = new PopupWithImage(selectors.popupImage)
popupWithImage.setEventListeners()

const popupAddCard = new PopupWithForm(selectors.popupNewCard, (data, callback) => {
  return yandexApi
    .addNewCardToServer(data)
    .then((createdCard) => {
      const newCard = createCard(createdCard)
      cardSection.addItemToStart(newCard)
      popupAddCard.close()
      callback()
    })
    .catch((err) => {
      console.log(err)
      callback()
    })
})
popupAddCard.setEventListeners()

buttonAddCard.addEventListener('click', () => {
  popupAddCard.open()
  formValidators[selectors.popupFormNewCard].resetValidation()
})

const formValidators = {}

const popupUpdateAvatar = new PopupWithForm(
  selectors.popupUpdateAvatar,
  (data, callback) => {
    return yandexApi
      .updateAvatar(data.link)
      .then(() => {
        userInfo.setUserAvatar(data.link)
        popupUpdateAvatar.close()
      callback()
      })
      .catch((err) => {
        console.log(err)
      callback()
      })
  }
)
popupUpdateAvatar.setEventListeners()

function enableFormValidation() {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  )
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator
    validator.enableValidation()
  })
}

enableFormValidation()

const yandexApi = new Api(apiOptions)

Promise.all([
  yandexApi.loadNameAndInfo(),
  yandexApi.getInitialCards()
])
.then((values) => {
  const name = values[0].name
  const info = values[0].about
  const id = values[0]._id
  const avatar = values[0].avatar
  userInfo.setUserInfo({ name, info, id })
  userInfo.setUserAvatar(avatar)

  cardSection.renderItems(values[1])
})
.catch((err) => {
  console.log(err)
})

const popupDeletingCard = new PopupConfirmationDelete(
  selectors.popupDeletingCard,
  (card) => {
    yandexApi.removeCard(card.id)
    .then(card._removeCard())
    .then(popupDeletingCard.close())
    .catch((err) => {
      console.log(err)
    })
  }
)

popupDeletingCard.setEventListeners()