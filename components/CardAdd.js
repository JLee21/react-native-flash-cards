import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,
  TextInput, TextButton
} from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { fetchDecks, submitCard } from '../utils/api'
import { AppLoading} from 'expo'

class DeckNew extends Component {
  state = {
    textQuestion: 'QuestionDefault',
    textAnswer: 'AnswerDefault'
  }
  handleSubmit = () => {
    const { deckId } = this.props
    const card = {
      deckId,
      question: {
        question: this.state.textQuestion,
        answer: this.state.textAnswer
      }
    }

    // Save to Store and
    // update AsyncStorage
    this.props.dispatch(addCard(card))

    this.props.navigation.goBack()

  }

  render () {
    const { navigation } = this.props

    return (
      <View>
        <Text>Add New Card</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type the question here ..."
          onChangeText={(text) => this.setState({ textQuestion: text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Type the answer here ..."
          onChangeText={(text) => this.setState({ textAnswer: text })}
        />
        <TouchableOpacity
          onPress={this.handleSubmit}>
            <Text>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps ( { decks }, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
  }
}

function mapDispatchToProps () {

}

export default connect(mapStateToProps)(DeckNew)
