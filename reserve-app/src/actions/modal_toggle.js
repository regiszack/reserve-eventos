import { MODAL_TOGGLE } from './types'

export default function toggleModal(modal) {

  const newModal = {
    ...modal,
    isOpen: !modal.isOpen
  }

  return {
    type: MODAL_TOGGLE,
    payload: newModal
  }
}