import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { AppLoading} from 'expo'
import QuizCard, { CORRECT, INCORRECT } from './QuizCard'

class QuizContainer extends Component {

  state = {
    numCorrect: 0,
    cardNum: 0,
    showResults: false
  }

  onUserSubmit = (userAnswer) => {
    const maxCount = this.props.deck.questions.length

    if (userAnswer == CORRECT) {
      this.setState((state) => {
        const newScore = state.numCorrect + 1

        return {
          ...state,
          numCorrect: newScore > maxCount ? maxCount : newScore
        }
      })
    } else {
      this.setState((state) => {
        const newScore = state.numCorrect - 1

        return {
          ...state,
          numCorrect: newScore < 0 ? 0 : newScore
        }
      })
    }

    // Increment to next card.
    const newCardNum = this.state.cardNum + 1
    // After going through all the cards, show results.
    if (newCardNum == maxCount) {
      this.setState({showResults: true})
    } else {
      this.setState({cardNum: newCardNum})
    }
  }

  restart = () => {
    this.setState({
      numCorrect: 0,
      cardNum: 0,
      showResults: false
    })
  }

  render () {
    const { deck, navigation } = this.props
    const { cardNum, numCorrect, showResults } = this.state
    const card = deck.questions[cardNum]
    const numCards = deck.questions.length
    const questionsRemaining = deck.questions.length - cardNum


    return (
      <View>
        <Text>QuizContainer</Text>


        { showResults &&
          <View>
            <Text>Your Score! {numCorrect} / {numCards} </Text>
            <TouchableOpacity
              onPress={this.restart}>
              <Text>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        }

        { (card && !showResults) &&
          <View>
            <Text>Questions Remaining: {questionsRemaining}</Text>
            <QuizCard card={card} submit={this.onUserSubmit}/>
          </View>
        }

      </View>
    )
  }
}

function mapStateToProps ( { decks }, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deck: decks[deckId]
  }
}

function mapDispatchToProps () {

}

export default connect(mapStateToProps)(QuizContainer)
