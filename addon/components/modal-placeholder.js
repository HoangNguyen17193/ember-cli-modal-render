import Ember from 'ember';
import layout from '../templates/components/modal-placeholder';

const { A, assert, typeOf, RSVP } = Ember;

export default Ember.Component.extend({
  layout,
  modal: Ember.inject.service(),
  modals: A([]),
  init() {
    this._super(...arguments);
    const modalService = this.get('modal');
    assert('modal service should be initialized', modalService);
    modalService.set('modalPlaceHolder', this);
  },
  createModal(modal) {
    const modalDefinition = typeOf(modal) !== 'object' ? { componentName: modal } : modal;

    assert('componentName must be a string', typeOf(modalDefinition.componentName) === 'string');

    this.get('modals').addObject(modalDefinition);

    return new RSVP.Promise((resolve, reject) => {
      modalDefinition.resolve = resolve;
      modalDefinition.reject = reject;
    }, `Modal ${modalDefinition.componentName} promise`);
  },
  actions: {
    closeModal(modal) {
      const modals = this.get('modals');
      const modalInstance = modals.find(m => m === modal);
      if (modalInstance) {
        modals.removeObject(modalInstance);
      }
    }
  }
})