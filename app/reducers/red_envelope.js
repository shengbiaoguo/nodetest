import * as types from '../constants/ActionTypes.js';

const initialState = {
  done_request: false,
  status_ok: false,
  status_error: false
}

export default function spring_festival(state = initialState, action) {
  switch (action.type) {

    case types.RECEIVED_RED_ENVELOPE:
      var newState = state;
      newState.done_request = true;
      newState.status_ok = true;
      return Object.assign({}, state, newState);

    case types.ERROR_RED_ENVELOPE:
      var newState = state;
      newState.done_request = true;
      newState.status_error = true;
      return Object.assign({}, state, newState);

    default:
      return state
  }
}