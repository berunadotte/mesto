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


let formElement = document.querySelector('.popup__form')
let nameInput = document.querySelector('.popup__name')
let jobInput = document.querySelector('.popup__job')


function handleFormSubmit (evt) {
    evt.preventDefault();

    nameValue = nameInput.getAttribute('value')
    jobValue = jobInput.getAttribute('value')

    title = document.querySelector('.profile__title')
    subtitle = document.querySelector('.profile__subtitle')

    // title.textContent=nameValue
    // subtitle.textContent = 'huy'

    console.log(nameValue)
    console.log(jobValue)


    // closeEditProfile()


    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
