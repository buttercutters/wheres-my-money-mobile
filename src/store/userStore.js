import { createStore } from 'redux';

const defaultState = {
  uniqueUserId: null,
  dailySpending: 25,
};

function userStore(state = defaultState, action) {
  switch (action.type) {
    case 'LOG_IN':
      return Object.assign({}, state, {
        uniqueUserId: action.uniqueUserId,
      });
    case 'LOG_OUT':
      return Object.assign({}, state, {
        uniqueUserId: null,
      });
    default:
      return state;
  }
}

export default createStore(userStore);
