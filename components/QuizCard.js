import React, { Component } from 'react'
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { AppLoading} from 'expo'

export const CORRECT = 'correct'
export const INCORRECT = 'incorrect'

class QuizCard extends Component {

  state = {
    userAnswer: null,
    showAnswer: false
  }

  handleSubmit = (answer) => {
    this.props.submit(answer)
    this.setState({showAnswer: false})
  }

  showAnswer = () => {
    this.setState({showAnswer: true})
  }

  render () {
    const { showAnswer } = this.state
    const { card } = this.props
    console.log('card', card);

    return (
      <View>
        <Text>QuizCard</Text>
        <Text>{card.question}</Text>

        {!showAnswer
          ? <TouchableOpacity
              onPress={this.showAnswer}>
              <Text>Show Answer</Text>
            </TouchableOpacity>
          : <View>
              <Text>{card.answer}</Text>
              <TouchableOpacity
                onPress={() => (this.handleSubmit(CORRECT))}>
                <Text>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (this.handleSubmit(INCORRECT))}>
                <Text>Incorrect</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  }
}

export default QuizCard
