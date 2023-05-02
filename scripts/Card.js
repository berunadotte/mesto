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



class Card {
  constructor(data){
    this._link = data.link
    this._text = data.name
  }
 
  view() {
    console.log(this._link)
    console.log(this._text)
  }

}

const newCard = new Card (initialCards[1])

newCard.view()


// const createCard = (cardName, cardLink) => {
//   const newCard = cardsTemplate.querySelector('.card').cloneNode(true)
//   const newCardImage = newCard.querySelector('.card__image')
//   const newCardLabel = newCard.querySelector('.card__label')
//   const newCardLikeButton = newCard.querySelector('.card__like-button')
//   const newCardLike = newCard.querySelector('.card__like')
//   const newCardDeleteButton = newCard.querySelector('.card__delete-button')

//   newCardImage.src = cardLink
//   newCardImage.alt = cardName
//   newCardLabel.textContent = cardName

//   newCardLikeButton.addEventListener('click', () => {
//     toggleLike(newCardLike)
//   })

//   newCardDeleteButton.addEventListener('click', (trash) => {
//     const trashTarget = trash.target.closest('.card')
//     trashTarget.remove()
//   })

//   newCardImage.addEventListener('click', () => {
//     openPopup(popupFullscreenImage)
//     popupImage.src = newCardImage.src
//     popupImage.alt = newCardLabel.textContent
//     popupImageLabel.textContent = newCardLabel.textContent
//   })
//   return newCard
// }