const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

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

let profileName = document.querySelector('.profile__title')
let profileJob = document.querySelector('.profile__subtitle')
let nameInput = document.querySelector('.popup__input_name-value')
let jobInput = document.querySelector('.popup__input_job-value')
let cardNameInput = document.querySelector('.popup__input_card-name-value')
let cardLinkInput = document.querySelector('.popup__input_image-link-value')


initialCards.forEach((arrCardsElement) => {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true)

  cardElement.querySelector('.card__image').src = arrCardsElement.link
  cardElement.querySelector('.card__image').alt = arrCardsElement.name
  cardElement.querySelector('.card__label').textContent = arrCardsElement.name

  cardsList.append(cardElement)
})

const popupToggle = (itm) => {
  itm.classList.toggle('popup_opened')
}

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

let cardLikeButtons = cardsList.querySelectorAll('.card__like-button')
let cardDeleteButtons = cardsList.querySelectorAll('.card__delete-button')

function handleAddCard(evt) {
  evt.preventDefault()

  initialCards[initialCards.length] = {name: cardNameInput.value, link: cardLinkInput.value}

  const newCard = cardsTemplate.querySelector('.card').cloneNode(true)

  newCard.querySelector('.card__image').src = cardLinkInput.value
  newCard.querySelector('.card__image').alt = cardNameInput.value
  newCard.querySelector('.card__label').textContent = cardNameInput.value

  cardsList.prepend(newCard)

  cardLinkInput.value = ''
  cardNameInput.value = ''

  popupToggle(popupAddingCardWindow)
}

cardLikeButtons.forEach((likeButton) => {
  likeButton.addEventListener('click', (evt) => {
    const eventTarget = evt.target
    if (eventTarget.src.includes('like_button_active')) {
    eventTarget.src = 'images/like_button.svg'
    } else {
    eventTarget.src = 'images/like_button_active.svg'
    }
  })
})

cardDeleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener('click', (trash) => {
    const trashTarget = trash.target.closest('.card')
    trashTarget.remove()
  })
})

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

