import { createStore } from 'redux';

const defaultState = {
  uniqueUserId: '2T5SetDIL2OJJ8AZtDACuuVUrGz1',
  dailySpending: 25,
};

function userStore(state = defaultState, action) {
  switch (action.type) {
    case 'LOG_IN':
      return Object.assign({}, state, {
        uniqueUserId: action.task,
      });
    default:
      return state;
  }
}

export default createStore(userStore);
