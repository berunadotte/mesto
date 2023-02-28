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

let profileEditButton = document.querySelector('.profile__edit-button')
let closeEditButton = document.querySelector('.popup-edit-profile__close-button')
let popupEditProfileWindow = document.querySelector('.popup-edit-profile')
let editProfileFormElement = document.querySelector('.popup-edit-profile__form')
let nameInput = document.querySelector('.popup-edit-profile__input_name_value')
let jobInput = document.querySelector('.popup-edit-profile__input_job_value')
let profileName = document.querySelector('.profile__title')
let profileJob = document.querySelector('.profile__subtitle')

let addCardButton = document.querySelector('.profile__add-button')
let closeAddingPopupButton = document.querySelector('.popup-new-card__close-button')
let popupAddingCardWindow = document.querySelector ('.popup-new-card')
let newCardFormElement = document.querySelector('.popup-new-card__form')
let cardNameInput =document.querySelector('.popup-new-card__input_card-name_value')
let cardLinkInput = document.querySelector('.popup__input_image-link_value')


initialCards.forEach((arrCardsElement) => {
  const cardsTemplate = document.querySelector('.cards__template').content
  const cardsList = document.querySelector('.cards__list')
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true)
 
  cardElement.querySelector('.card__image').src = arrCardsElement.link
  cardElement.querySelector('.card__image').alt = arrCardsElement.name
  cardElement.querySelector('.card__label').textContent = arrCardsElement.name

  cardsList.append(cardElement)

})


function openEditProfile() {
  // открытие попапа по нажатию на кнопку редактирования
  popupEditProfileWindow.setAttribute('class', 'popup-edit-profile popup-edit-profile_opened')

  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  // присваивание текстовых значений атрибуту value форм ввода данных пользователем
}

function closeEditProfile() {
  // закрытие попапа по нажатию на крестик
  popupEditProfileWindow.setAttribute('class', 'popup-edit-profile')
}

const openAddingCard = () => {
  popupAddingCardWindow.setAttribute('class', 'popup-new-card popup-new-card_opened')
}

const closeAddingCard = () => {
  popupAddingCardWindow.setAttribute('class', 'popup-new-card')
}

function handleFormSubmit(evt) {
  evt.preventDefault()
  // перехватывает действие по умолчанию при нажатии кнопки сохранить
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  // записывает значения введенные в форме пользователем в соответствующие текстовые значения элементов DOM дерева
  closeEditProfile()
  // вызов функции закрытия формы
}



function addNewCard() {
  // открытие попапа по нажатию на кнопку редактирования
  popupAdding.setAttribute('class', 'popup popup-new-card popup_opened')

  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  // присваивание текстовых значений атрибуту value форм ввода данных пользователем
}

function handleAddCard(evt) {
  evt.preventDefault()

  initialCards(initialCards.length) = {name: cardNameInput, link: cardLinkInput}

}





profileEditButton.addEventListener('click', openEditProfile)
closeEditButton.addEventListener('click', closeEditProfile)
editProfileFormElement.addEventListener('submit', handleFormSubmit)

closeAddingPopupButton.addEventListener('click', closeAddingCard)
addCardButton.addEventListener('click', openAddingCard)

