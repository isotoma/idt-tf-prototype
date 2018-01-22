// This is a duck. https://github.com/erikras/ducks-modular-redux
const NOTIFY_USER = 'NOTIFY_USER';
const ERROR = 'ERROR';
const CONFIRMATION = 'CONFIRMATION';

export const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY_USER: {
      return { notify_user: action.message };
    }
    case ERROR: {
      return { error: action.message };
    }
    case CONFIRMATION: {
      return { confirmation: action.message };
    }
    default:
      return state;
  }
};

export const notifyUser = message => ({
  type: NOTIFY_USER,
  message,
});

export const error = message => ({
  type: ERROR,
  message,
});

export const confirmation = message => ({
  type: CONFIRMATION,
  message,
});

export default reducer;