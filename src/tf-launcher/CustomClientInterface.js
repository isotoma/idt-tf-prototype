import { notifyUser } from '../reducer';

export default store => ({
  init: () => {},
  setActivityName: () => {},
  notifyUser: (message, type, actions = [], dismissible = true, dismissAfterAction = true) => {
    console.log('notifyUser: ', message, type, actions, dismissible, dismissAfterAction);
    store.dispatch(notifyUser(message));
  },
  confirmation: (
      message,
      {
        onConfirm,
        confirmLabel = 'Close',
        onCancel,
        cancelLabel = 'Continue',
        confirmIsDangerous = false,
      }
  ) => {
    console.log('confirmation: ', message);
    onConfirm();
  },
  getErrorHandler: () => (message, type) => console.log('error: ', message, type),
});