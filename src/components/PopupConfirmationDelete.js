import Popup from "./Popup";

export default class PopupConfirmationDelete extends Popup {
    constructor(popupSelector, callback) {
      super(popupSelector);
      this._callback = callback;
      this._deleteButton = this._popup.querySelector('.submit-button');
      // console.log(this._deleteButton)
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._deleteButton.addEventListener('click', () => {
        this.confirm();
        this.close();
      });
    }
  
    open(card) {
      this._card = card;
      super.open();
    }
  
    confirm() {
      this._callback(this._card);
    }
  }
  