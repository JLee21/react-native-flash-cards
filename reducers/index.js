import {
  RECEIVE_DECKS,
  GET_DECK,
  ADD_DECK,
  ADD_CARD
} from '../actions'

function reducer (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        decks: {
          ...action.decks
        }
      }
    case GET_DECK :
      return {
        ...state,
      }
    case ADD_DECK :
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deck.title]: action.deck
        }
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
