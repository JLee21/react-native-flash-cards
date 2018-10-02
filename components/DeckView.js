import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { AppLoading} from 'expo'

class DeckView extends Component {

  startQuiz = () => {
    const { deck, navigation } = this.props
    navigation.navigate('QuizContainer', {
      'deckId': deck.title
    })
  }

  addCard = () => {
    const { deck, navigation } = this.props
    navigation.navigate('CardAdd', {
      'deckId': deck.title
    })
  }

  render () {
    const { deck, navigation } = this.props
    const deckLength = deck.questions.length

    return (
      <View>
        <Text>Deck View</Text>
        <Text>Title: {deck.title}</Text>
        <Text>Number of Questions: {deck.questions.length}</Text>

        {deckLength > 0
          ?
            <TouchableOpacity onPress={this.startQuiz}>
              <Text>Start Quiz</Text>
            </TouchableOpacity>
          :
            <Text>Please add cards to your deck!</Text>
        }


        <TouchableOpacity onPress={this.addCard}>
          <Text>Add Card</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

function mapStateToProps ( { decks }, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: decks[deckId]
  }
}

function mapDispatchToProps () {

}

export default connect(mapStateToProps)(DeckView)
