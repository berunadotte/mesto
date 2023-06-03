export default class Api {
  constructor() {
    this._token = '432e3bdb-dcc8-4c2f-864d-6bca425811a2'
  }

  changeNameAndInfo(callback) {
    fetch('https://nomoreparties.co/v1/cohort-66/users/me', {
  headers: {
    authorization: this._token
  }
})
  .then(res => res.json())
  .then((result) => {
      callback(result)
  });
  }

  getInitialCards(renderer) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.json())
    .then((result) => {
      renderer(result)
    })
  }





  // check() {
  //   console.log(initialCards)
  // }
}