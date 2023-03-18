// random comment

const popupForms = document.querySelectorAll('.popup__form')
const popupInputs = document.querySelectorAll('.popup__input')


popupInputs.forEach((popupInput) => {
  popupInput.addEventListener('input', (evt) => {
    console.log(evt.target.validity.valid)
  })
})




