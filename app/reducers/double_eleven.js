import * as types from '../constants/ActionTypes.js';

const initialState = {
  loading: false,
  productList: []
}

export default function double_eleven(state = initialState, action) {
  switch (action.type) {

      case types.DOULE_ELEVEN_ACTIVITY_LIST:
        var newState = state;
        newState.productList = newState.productList.concat(action.payload.productList);
        return Object.assign({}, state, newState);

      default:
        return state
    }
}
