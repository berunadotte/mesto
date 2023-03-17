const cardsTemplate = document.querySelector('.cards__template').content
const cardsList = document.querySelector('.cards__list')

const popupOverlay = document.querySelectorAll('.popup')
const buttonsClose = document.querySelectorAll('.popup__close-button')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditProfileWindow = document.querySelector('.popup_edit-profile')
const profileEditFormElement = document.querySelector(
  '.popup__form_edit-profile'
)
const buttonAddCard = document.querySelector('.profile__add-button')
const popupAddingCardWindow = document.querySelector('.popup_new-card')
const newCardFormElement = document.querySelector('.popup__form_new-card')
const popupFullscreenImage = document.querySelector('.popup_image')
const popupImage = document.querySelector('.popup__image')
const popupImageLabel = document.querySelector('.popup__image-label')

const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const nameInput = document.querySelector('.popup__input_name-value')
const jobInput = document.querySelector('.popup__input_job-value')
const cardNameInput = document.querySelector('.popup__input_card-name-value')
const cardLinkInput = document.querySelector('.popup__input_image-link-value')

const toggleLike = (element) => {
  element.classList.toggle('card__like_active')
}
const togglePopup = (item) => {
  item.classList.toggle('popup_opened')
}

const openEditProfile = () => {
  // открытие попапа по нажатию на кнопку редактирования
  togglePopup(popupEditProfileWindow)

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
  togglePopup(popupEditProfileWindow)
  // вызов функции закрытия формы
}

const createCard = (cardName, cardLink) => {
  const newCard = cardsTemplate.querySelector('.card').cloneNode(true)
  const newCardImage = newCard.querySelector('.card__image')
  const newCardLabel = newCard.querySelector('.card__label')
  const newCardLikeButton = newCard.querySelector('.card__like-button')
  const newCardLike = newCard.querySelector('.card__like')
  const newCardDeleteButton = newCard.querySelector('.card__delete-button')

  newCardImage.src = cardLink
  newCardImage.alt = cardName
  newCardLabel.textContent = cardName

  newCardLikeButton.addEventListener('click', () => {
    toggleLike(newCardLike)
  })

  newCardDeleteButton.addEventListener('click', (trash) => {
    const trashTarget = trash.target.closest('.card')
    trashTarget.remove()
  })

  newCardImage.addEventListener('click', () => {
    popupFullscreenImage.classList.add('popup_opened')
    popupImage.src = newCardImage.src
    popupImage.alt = newCardLabel.textContent
    popupImageLabel.textContent = newCardLabel.textContent
  })
  newCardFormElement.reset()

  return newCard
}

initialCards.forEach((arrCardsElement) => {
  cardsList.append(createCard(arrCardsElement.name, arrCardsElement.link))
})

function addNewCard(evt) {
  evt.preventDefault()
  initialCards[initialCards.length] = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  }
  cardsList.prepend(createCard(cardNameInput.value, cardLinkInput.value))

  togglePopup(popupAddingCardWindow)
}

buttonsClose.forEach((closeBtn) => {
  closeBtn.addEventListener('click', (evt) => {
    const target = evt.target.closest('.popup')
    togglePopup(target)
  })
})

profileEditButton.addEventListener('click', openEditProfile)

buttonAddCard.addEventListener('click', () => {
  togglePopup(popupAddingCardWindow)
  newCardFormElement.reset()
})
profileEditFormElement.addEventListener('submit', submitProfileEdit)

newCardFormElement.addEventListener('submit', addNewCard)

const closeOverlay = (evt) => {
  if ((evt.target = evt.currentTarget)) {
    togglePopup(evt.target)
  }
}

popupOverlay.forEach((overlay) => {
  overlay.addEventListener('click', closeOverlay)
})

document.addEventListener('keydown', (evt) => {
  const openedPopup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape' && openedPopup) {
    togglePopup(openedPopup)
  }
})
