export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data
    this._link = data.link
    this._name = data.name
    this._newCard = cardSelector.querySelector('.card').cloneNode(true)
    this._newCardImage = this._newCard.querySelector('.card__image')
    this._newCardLabel = this._newCard.querySelector('.card__label')
    this._handleCardClick = handleCardClick
    this._buttonLike = this._newCard.querySelector('.card__like')
  }

  _toggleLike() {
    this._buttonLike.classList.toggle('card__like_active')
  }

  _setEventListeners() {
    this._newCardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })

    const newCardDeleteButton = this._newCard.querySelector('.card__delete-button')
    newCardDeleteButton.addEventListener('click', () => {
      this._newCard.remove() 
    })

    this._buttonLike.addEventListener('click', () => {
      this._toggleLike()
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
