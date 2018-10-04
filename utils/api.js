import { AsyncStorage } from 'react-native'
import { setExampleData, DECK_STORAGE_KEY } from './_data'

export function fetchDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(setExampleData)
}

export function submitDeck (deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck
  }))
}
