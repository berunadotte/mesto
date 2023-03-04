const cardsTemplate = document.querySelector('.cards__template').content
const cardsList = document.querySelector('.cards__list')

const popup = document.querySelector('.popup')
const closeButtons = document.querySelectorAll('.popup__close-button')
const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditProfileWindow = document.querySelector('.popup_edit-profile')
const editProfileFormElement = document.querySelector('.popup__form_edit-profile')
const addCardButton = document.querySelector('.profile__add-button')
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

const likeToggle = (element) => {
  element.classList.toggle('card__like_active')
}
const popupToggle = (item) => {
  item.classList.toggle('popup_opened')
}

initialCards.forEach((arrCardsElement) => {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true)
  const cardImage = cardElement.querySelector('.card__image')

  cardImage.src = arrCardsElement.link
  cardImage.alt = arrCardsElement.name
  cardElement.querySelector('.card__label').textContent = arrCardsElement.name
  const cardLike = cardElement.querySelector('.card__like')
  const cardLikeButton = cardElement.querySelector('.card__like-button')
  const cardDeleteButton = cardElement.querySelector('.card__delete-button')

  cardLikeButton.addEventListener('click', () => {
    likeToggle(cardLike)
  })
  
  cardDeleteButton.addEventListener('click', (trash) => {
    const trashTarget = trash.target.closest('.card')
    trashTarget.remove()
  })

  cardImage.addEventListener('click', () => {
    popupFullscreenImage.classList.add('popup_opened')
    popupImage.src = arrCardsElement.link
    popupImage.alt = arrCardsElement.name
    popupImageLabel.textContent = arrCardsElement.name
  })
  
  cardsList.append(cardElement)
})

function openEditProfile() {
  // открытие попапа по нажатию на кнопку редактирования
  popupToggle(popupEditProfileWindow)

  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  // присваивание текстовых значений атрибуту value форм ввода данных пользователем
}

function handleFormSubmit(evt) {
  evt.preventDefault()
  // перехватывает действие по умолчанию при нажатии кнопки сохранить
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  // записывает значения введенные в форме пользователем в соответствующие текстовые значения элементов DOM дерева
  popupToggle(popupEditProfileWindow)
  // вызов функции закрытия формы
}

function handleAddCard(evt) {
  evt.preventDefault()

  initialCards[initialCards.length] = {name: cardNameInput.value, link: cardLinkInput.value}

  const newCard = cardsTemplate.querySelector('.card').cloneNode(true)
  const newCardImage = newCard.querySelector('.card__image')
  const newCardLabel = newCard.querySelector('.card__label')

  newCardImage.src = cardLinkInput.value
  newCardImage.alt = cardNameInput.value
  newCardLabel.textContent = cardNameInput.value

  const newCardLikeButton = newCard.querySelector('.card__like-button')
  const newCardLike = newCard.querySelector('.card__like')
  const newCardDeleteButton = newCard.querySelector('.card__delete-button')

  newCardLikeButton.addEventListener('click', () => {
    likeToggle(newCardLike)
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

  cardsList.prepend(newCard)

  newCardFormElement.reset()

  popupToggle(popupAddingCardWindow)
}

closeButtons.forEach((closeBtn) => {
  closeBtn.addEventListener('click', (evt) => {
  const target = evt.target.closest('.popup')
  popupToggle(target)
  })
})

profileEditButton.addEventListener('click', openEditProfile)
addCardButton.addEventListener('click', () => popupToggle(popupAddingCardWindow)) 
editProfileFormElement.addEventListener('submit', handleFormSubmit)
newCardFormElement.addEventListener('submit', handleAddCard)

