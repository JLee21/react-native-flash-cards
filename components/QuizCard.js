import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Divider, Heading, Title } from '@shoutem/ui'
import { connect } from 'react-redux'
import { styles } from '../utils/styles'
import * as colors from '../utils/colors'

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

    return (
      <View>
        <View style={styles.questionView}>
          <Title>{card.question}</Title>
        </View>
        <Divider />

        {!showAnswer
          ? <View style={{justifyContent: 'flex-end'}}>
              <TouchableOpacity
                style={styles.item}
                onPress={this.showAnswer}>
                <Title>Show Answer</Title>
              </TouchableOpacity>
            </View>
          : <View style={{padding: 20, margin: 10}}>
              <Title>{card.answer}</Title>
              <TouchableOpacity
                style={styles.item}
                onPress={() => (this.handleSubmit(CORRECT))}>
                <Title>Correct</Title>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.item, {backgroundColor: colors.black}]}
                onPress={() => (this.handleSubmit(INCORRECT))}>
                <Title style={{color: colors.white}}>Incorrect</Title>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  }
}

export default QuizCard
