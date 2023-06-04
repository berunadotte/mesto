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
  const newCard = new Card(cardData, cardTemplate, (name, link) => {
    popupWithImage.open(link, name)
  }, popupDeletingCard, (card) => {
    // console.log(`${userInfo._id} -- ${card._ownerId}`)
    return userInfo._id == card._ownerId
  }, (card) => {
    if (card._isLiked)
      yandexApi.removeLike(card._id)
        .then((data) => {
          card._updateLikes(data, userInfo._id)
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    else yandexApi.addLike(card._id)
      .then((data) => {
        card._updateLikes(data, userInfo._id)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  )
  const cardElement = newCard.createCard(userInfo._id)
  return cardElement
}

const userInfo = new UserInfo({
  nameSelector: selectors.profileTitle,
  infoSelector: selectors.profileSubtitle,
  avatarSelector: selectors.profileAvatar,
  avatarImgSelector: selectors.profileAvatarImg,
  onAvatarClick: () => {
    console.log(1234)
    popupUpdateAvatar.open();
    formValidators[selectors.popupFormUpdateAvatar].resetValidation();
  }
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
  
  return yandexApi.changeNameAndInfo(data.name, data.job)
  .then((result) => {
    popupProfile.close()
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
})
popupProfile.setEventListeners()

const popupWithImage = new PopupWithImage(selectors.popupImage)
popupWithImage.setEventListeners()

const popupAddCard = new PopupWithForm(selectors.popupNewCard, (data) => {
  return yandexApi.addNewCardToServer(data)
    .then((createdCard) => {
      const newCard = createCard(createdCard)
      cardSection.addItemToStart(newCard)
      popupAddCard.close()
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
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

const popupUpdateAvatar = new PopupWithForm(selectors.popupUpdateAvatar, (data) => {
  return yandexApi.updateAvatar(data.link)
    .then(() => {
      userInfo.setUserAvatar(data.link)
      popupUpdateAvatar.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
});
popupUpdateAvatar.setEventListeners();



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

const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '432e3bdb-dcc8-4c2f-864d-6bca425811a2',
    'Content-Type': 'application/json; charset=UTF-8',
  },
}
const yandexApi = new Api(options)


yandexApi.loadNameAndInfo()
  .then((result) => {
    const name = result.name
    const info = result.about
    const id = result._id
    const avatar = result.avatar
    userInfo.setUserInfo({ name, info, id })
    userInfo.setUserAvatar(avatar)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

yandexApi.getInitialCards()
  .then((arrCards) => {
    cardSection.renderItems(arrCards)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

const popupDeletingCard = new PopupConfirmationDelete(selectors.popupDeletingCard, ((card) => {
  yandexApi.removeCard(card._id)
  card._removeCard();
}))
popupDeletingCard.setEventListeners()
