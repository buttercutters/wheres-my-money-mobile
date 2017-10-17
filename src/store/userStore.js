import { createStore } from 'redux';

const defaultState = {
  uniqueUserId: null,
  dailySpending: 25,
  firstTimeUser: false,
  institutions: [],
  userIdToken: null,
};

function userStore(state = defaultState, action) {
  switch (action.type) {
    case 'LOG_IN':
      return Object.assign({}, state, {
        uniqueUserId: action.uniqueUserId,
        firstTimeUser: action.firstTimeUser,
        userIdToken: action.userIdToken,
      });
    case 'LOG_OUT':
      return Object.assign({}, state, {
        uniqueUserId: null,
        firstTimeUser: false,
      });
    case 'LINK_BANK':
      return Object.assign({}, state, {
        institutions: state.institutions.concat([{ name: action.institution, active: true }]),
      });
    default:
      return state;
  }
}

export default createStore(userStore);
