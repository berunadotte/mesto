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
  popupDeletingCard: '.popup_before_deleting',
  popupUpdateAvatar: '.popup_update_avatar',
  popupFormUpdateAvatar: 'update_avatar_form',
  profileAvatar: '.profile__avatar',
  profileAvatarImg: '.profile__avatar-img',
}

export const profileEditButton = document.querySelector(selectors.profileEditButton)
export const nameInput = document.querySelector(selectors.popupInputNameValue)
export const jobInput = document.querySelector(selectors.popupInputJobValue)
export const cardTemplate = document.querySelector(selectors.cardTemplate).content
export const buttonAddCard = document.querySelector(selectors.buttonAddCard)

export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.submit-button',
  inputErrorClass: 'popup__input_type_error',
  formSelector: '.popup__form',
}

export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '432e3bdb-dcc8-4c2f-864d-6bca425811a2',
    'Content-Type': 'application/json; charset=UTF-8',
  },
}
