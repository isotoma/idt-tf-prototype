// This is a duck. https://github.com/erikras/ducks-modular-redux
const NOTIFY_USER = 'NOTIFY_USER';

export const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY_USER: {
      return {
        ...state,
        notify_user: action.message,
      };
    }
    default:
      return state;
  }
};

export const notifyUser = message => ({
  type: NOTIFY_USER,
  message,
});

export default reducer;