export default class Card {
  constructor(data, cardSelector, handleCardClick, popupDeletingCard, checkOwner, toggleLike) {
    this._data = data
    this._link = data.link
    this._name = data.name
    this._ownerId = data.owner._id
    this._checkOwner = checkOwner
    this.id = data._id
    this.isLiked = false
    this._toggleLike = toggleLike
    this._newCard = cardSelector.querySelector('.card').cloneNode(true)
    this._newCardImage = this._newCard.querySelector('.card__image')
    this._newCardLabel = this._newCard.querySelector('.card__label')
    this._handleCardClick = handleCardClick
    this._buttonLike = this._newCard.querySelector('.card__like')
    this._likeCounter = this._newCard.querySelector('.card__like_count')
    this._popupDeletingCard = popupDeletingCard
  }

  _setEventListeners() {
    this._newCardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })

    const newCardDeleteButton = this._newCard.querySelector(
      '.card__delete-button'
    )
    if (this._checkOwner(this)) {
      newCardDeleteButton.addEventListener('click', () => {
        this._popupDeletingCard.open(this)})
    } else {
      newCardDeleteButton.classList.add('card__delete-button_disabled')
    }

    this._buttonLike.addEventListener('click', () => {
      this._toggleLike(this)
    })
  }

  _removeCard() {
    this._newCard.remove()
    this._newCard = null
  }

  createCard(userId) {
    this._newCardImage.src = this._link
    this._newCardImage.alt = this._name
    this._newCardLabel.textContent = this._name

    this._setEventListeners()
    this.updateLikes(this._data, userId)

    return this._newCard
  }

  updateLikes(data, userId) {
    if (data.likes !== undefined) {
      this._likeCounter.textContent = data.likes.length
      this.isLiked = data.likes.some((like) => like._id === userId)
      if (this.isLiked) this._buttonLike.classList.add('card__like_active')
      else this._buttonLike.classList.remove('card__like_active')
    }
  }
}
