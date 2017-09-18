import { createStore } from 'redux';

const defaultState = {
  uniqueUserId: null,
  dailySpending: 25,
  firstTimeUser: false,
};

function userStore(state = defaultState, action) {
  switch (action.type) {
    case 'LOG_IN':
      return Object.assign({}, state, {
        uniqueUserId: action.uniqueUserId,
        firstTimeUser: action.firstTimeUser,
      });
    case 'LOG_OUT':
      return Object.assign({}, state, {
        uniqueUserId: null,
        firstTimeUser: false,
      });
    default:
      return state;
  }
}

export default createStore(userStore);
