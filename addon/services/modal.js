import Ember from 'ember';

export default Ember.Service.extend({
  modalPlaceHolder: null,
  open(modal) {
    const modalPlaceHolder = this.get('modalPlaceHolder');
    Ember.assert('modal placeholder should be not null', modalPlaceHolder);
    return modalPlaceHolder.createModal(modal);
  }
})