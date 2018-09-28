export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const GET_DECK = 'GET_DECK'
export const SET_TITLE = 'SET_TITLE'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function getDeck (title) {
  return {
    type: GET_DECK,
    title,
  }
}

export function setTitle (title) {
  return {
    type: SET_TITLE,
    title,
  }
}

export function addCard (card) {
  return {
    type: ADD_CARD,
    card,
  }
}
