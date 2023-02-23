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
let closeEditButton = document.querySelector('.popup__close-button')
let popupWindow = document.querySelector('.popup')
let formElement = document.querySelector('.popup__form')
let nameInput = document.querySelector('.popup__input_name_value')
let jobInput = document.querySelector('.popup__input_job_value')
let profileName = document.querySelector('.profile__title')
let profileJob = document.querySelector('.profile__subtitle')
let cardsList = document.querySelector('.cards__list')
const cardImage = document.querySelector('.card__image')
const cardLabel = document.querySelector('.card__label')



 initialCards.forEach( (arrCardsElement) => {
 
//   cardImage.src = arrCardsElement.link
//   cardImage.alt = arrCardsElement.name

//   card.append(cardImage)


//   cardsList.append(card)
 
})
// console.log(cardsList)

function openEditProfile() {
  // открытие попапа по нажатию на кнопку редактирования
  popupWindow.setAttribute('class', 'popup popup_opened')

  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  // присваивание текстовых значений атрибуту value форм ввода данных пользователем
}

function closeEditProfile() {
  // закрытие попапа по нажатию на крестик
  popupWindow.setAttribute('class', 'popup')
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

profileEditButton.addEventListener('click', openEditProfile)
closeEditButton.addEventListener('click', closeEditProfile)
formElement.addEventListener('submit', handleFormSubmit)


