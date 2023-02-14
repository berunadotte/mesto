let editProfileButton = document.querySelector('.profile__edit-button')
let closeEditButton = document.querySelector('.popup__close-button')
let likeButton = document.querySelector('.card__like-button')
let popupWindow = document.querySelector('.popup')
let formElement = document.querySelector('.popup__form')
let nameInput = document.querySelector('.popup__name')
let jobInput = document.querySelector('.popup__job')

function openEditProfile() {
  popupWindow.setAttribute('class', 'popup popup_opened')
}

function closeEditProfile() {
  popupWindow.setAttribute('class', 'popup')
}

editProfileButton.addEventListener('click', openEditProfile)
closeEditButton.addEventListener('click', closeEditProfile)

function handleFormSubmit(evt) {
  evt.preventDefault()

  nameValue = nameInput.value
  jobValue = jobInput.value

  let profileName = document.querySelector('.profile__title')
  let profileJob = document.querySelector('.profile__subtitle')

  profileName.textContent = nameValue
  profileJob.textContent = jobValue

  closeEditProfile()
}

formElement.addEventListener('submit', handleFormSubmit)
