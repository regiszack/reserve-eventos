import { combineReducers } from 'redux'
import ModalReducer from './reducer_modal'

const rootReducer = combineReducers({
  modal: ModalReducer
})

export default rootReducer