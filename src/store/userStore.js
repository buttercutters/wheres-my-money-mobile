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
    default:
      return state;
  }
}

export default createStore(userStore);
