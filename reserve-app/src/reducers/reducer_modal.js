import { MODAL_TOGGLE } from '../actions/types'

const modal = {
  header: 'Padrão',
  size: null,
  type: null,
  isOpen: false,
  buttons: [],
  content: null
}

export default function (state = modal, action) {
  switch (action.type) {
    case MODAL_TOGGLE:
      return action.payload
    default:
      break  
  }

  return state
}