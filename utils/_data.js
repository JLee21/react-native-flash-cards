let decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
}

export function _getDecks () {
  // return all of the decks along with their titles, questions, and answers.
  return new Promise((res, rej) => {
    setTimeout(() => res({...decks}), 300)
  })
}

export function _getDeck (id) {
  // take in a single id argument and return the deck associated with that id.
  return new Promise((res, rej) => {
    setTimeout(() => res({decks[id]}), 300)
  })
}

export function _saveDeckTitle (title) {
  // take in a single title argument and add it to the decks.
  return new Promise((res, rej) => {
    setTimeout(() => {
      decks = {
        ...decks,
        [title]: {
          title: title,
          questions: []
        }
      }

      res(true),
    }, 300)

  })
}

export function _addCardToDeck (title, card) {
  // take in two arguments, title and card, and will add the card to the list
  // of questions for the deck with the associated title.
  return new Promise((res, rej) => {
    setTimeout(() => {
      decks = {
        ...decks,
        decks[title].questions.push(card)
      }

      res(true),
    }, 300)

  })
}
