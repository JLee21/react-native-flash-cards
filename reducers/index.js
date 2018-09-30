import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from '../utils/_data'
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
      const { deckId, question } = action.card

      AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(data => {
          data = JSON.parse(data)
          console.log('AsyncStorage data from inside ADD_CARD\n', data[deckId].questions);

          // data = {
          //   ...data,
          //   data[deckId]: {
          //     ...data[deckId],
          //     questions: data[deckId].questions.concat(question)
          //   }
          // }
          data = {
            ...data,
            [deckId]: {
              ...data[deckId],
              questions: data[deckId].questions.concat(question)
            }
          }
          AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
          console.log('AsyncStorage data from inside ADD_CARD after\n', data);

        })

      return {
        ...state,
        decks: {
          ...state.decks,
          [deckId]: {
            ...state.decks[deckId],
            questions: state.decks[deckId].questions.concat(question)
          }
        }
      }
    default :
      return state
  }
}

export default reducer
