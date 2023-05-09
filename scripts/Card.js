import { popupNewCardSubmitButton, popupFullscreenImage, popupImage, popupImageLabel } from "./index.js"

export default class Card {
  constructor(data){
    this._link = data.link
    this._name = data.name
    this._newCard = document.querySelector('.cards__template').content.querySelector('.card').cloneNode(true)
    this._newCardImage = this._newCard.querySelector('.card__image')
    this._newCardLabel = this._newCard.querySelector('.card__label')
  }

  _toggleLike(element) {
   element.classList.toggle('card__like_active')
  }

  _likeButtonHandler() {
    const newCardLikeButton = this._newCard.querySelector('.card__like-button')
    const newCardLike = this._newCard.querySelector('.card__like')
    newCardLikeButton.addEventListener('click', () => {
      this._toggleLike(newCardLike)
    })
  }

  _deleteButtonHandler() {
    const newCardDeleteButton = this._newCard.querySelector('.card__delete-button')
    newCardDeleteButton.addEventListener('click', (trash) => {
      const trashTarget = trash.target.closest('.card')
      trashTarget.remove()
    })
  }

  _fullscreenHandler() {
    this._newCardImage.addEventListener('click', () => {
      popupFullscreenImage.classList.add('popup_opened')
      popupImage.src = this._newCardImage.src
      popupImage.alt = this._newCardLabel.textContent
      popupImageLabel.textContent = this._newCardLabel.textContent
    })
  }

  createCard() {
    popupNewCardSubmitButton.setAttribute('disabled', true)
    this._newCardImage.src = this._link
    this._newCardImage.alt = this._name
    this._newCardLabel.textContent = this._name

    this._likeButtonHandler()
    this._deleteButtonHandler()
    this._fullscreenHandler()
  
    return this._newCard
  }
}





