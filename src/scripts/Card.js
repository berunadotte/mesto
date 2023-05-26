export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._link = data.link
    this._name = data.name
    this._newCard = cardSelector.querySelector('.card').cloneNode(true)
    this._newCardImage = this._newCard.querySelector('.card__image')
    this._newCardLabel = this._newCard.querySelector('.card__label')
    this._handleCardClick = handleCardClick
  }

  _toggleLike(element) {
    element.classList.toggle('card__like_active')
  }

  _setEventListeners() {
    this._newCardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })

    const newCardDeleteButton = this._newCard.querySelector('.card__delete-button')
    newCardDeleteButton.addEventListener('click', (trash) => {
      const trashTarget = trash.target.closest('.card')
      trashTarget.remove()
    })

    const newCardLikeButton = this._newCard.querySelector('.card__like-button')
    const newCardLike = this._newCard.querySelector('.card__like')
    newCardLikeButton.addEventListener('click', () => {
      this._toggleLike(newCardLike)
    })
  }

  createCard() {
    this._newCardImage.src = this._link
    this._newCardImage.alt = this._name
    this._newCardLabel.textContent = this._name

    this._setEventListeners()

    return this._newCard
  }
}
