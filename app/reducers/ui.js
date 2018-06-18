import * as types from '../constants/ActionTypes.js';
import { router } from 'react-router';

const initialState = {
  show_popup: false,
  popup:{
  	title: "",
  	body: "",
  	button_text: "",
  	button_link: ""
  }
}

export default function ui(state = initialState, action) {
  switch (action.type) {

      case types.DISPLAY_POPUP:
        var newState = state;
        newState.show_popup = true;
        newState.popup = {
        	title: action.payload.title,
        	body: action.payload.body,
        	button_text: action.payload.button_text,
        	button_link: action.payload.button_link,
        }
        return Object.assign({}, state, newState);

      default:
        return state
    }
}
