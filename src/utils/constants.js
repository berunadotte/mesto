export const initialCards = [
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

const addButtonImage = new URL('../images/add_button_image.svg', import.meta.url)
const deleteButtonImage = new URL('../images/delete-button_icon.svg', import.meta.url)
const activeLikeButtonImage = new URL('../images/like_button_active.svg', import.meta.url)
const editButtonImage = new URL('../images/profile__edit-button.svg', import.meta.url)

export const images = [
  { name: 'add_button_image', image: addButtonImage },
  { name: 'delete-button_icon', link: deleteButtonImage },
  { name: 'like_button_active', link: activeLikeButtonImage },
  { name: 'profile__edit', link: editButtonImage },
]

export const selectors = {
  cardsList: '.cards__list',
  profileEditButton: '.profile__edit-button',
  popupEditProfile: '.popup_edit-profile',
  buttonAddCard: '.profile__add-button',
  popupNewCard: '.popup_new-card',
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
  popupInputNameValue: '.popup__input_name-value',
  popupInputJobValue: '.popup__input_job-value',
  cardTemplate: '.cards__template',
  popupFormEditProfile: 'popup__form_edit-profile',
  popupFormNewCard: 'popup__form_new-card',
  popupImage: '.popup_image',
}

export const profileEditButton = document.querySelector(selectors.profileEditButton)
export const nameInput = document.querySelector(selectors.popupInputNameValue)
export const jobInput = document.querySelector(selectors.popupInputJobValue)
export const cardTemplate = document.querySelector(selectors.cardTemplate).content
export const buttonAddCard = document.querySelector(selectors.buttonAddCard)

