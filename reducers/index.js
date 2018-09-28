import {
  RECEIVE_DECKS,
  GET_DECK,
  SET_TITLE,
  ADD_CARD
} from '../actions'

function reducer (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case GET_DECK :
      return {
        ...state,
      }
    case SET_TITLE :
      return {
        ...state,
      }
    case ADD_CARD :
      return {
        ...state,
      }
    default :
      return state
  }
}

export default reducer
