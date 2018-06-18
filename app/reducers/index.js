import { combineReducers } from 'redux'
import { syncHistory, routeReducer } from 'redux-simple-router'
import ui from './ui'
import double_eleven from './double_eleven'
import new_in from './new_in'
import spring_festival from './spring_festival'
import red_envelope from './red_envelope'

const rootReducer = combineReducers({
  ui,
  double_eleven,
  new_in,
  spring_festival,
  red_envelope,
  routing: routeReducer
})

export default rootReducer
