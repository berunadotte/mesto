let editProfileButton = document.querySelector('.profile__edit-button')
let closeEditButton = document.querySelector('.popup__close-button') 
let likeButton = document.querySelector('.card__like-button')
let popupWindow = document.querySelector('.popup')


function openEditProfile() {
  popupWindow.setAttribute('class', 'popup popup_opened')
}

function closeEditProfile() {
  popupWindow.setAttribute('class', 'popup')
}

editProfileButton.addEventListener('click', openEditProfile)
closeEditButton.addEventListener('click', closeEditProfile)
