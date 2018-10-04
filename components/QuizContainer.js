import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Divider, Title } from '@shoutem/ui'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'
import QuizCard, { CORRECT } from './QuizCard'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from '../utils/styles'

class QuizContainer extends Component {

  static navigationOptions = {
    title: 'Quiz',
  };

  state = {
    numCorrect: 0,
    cardNum: 0,
    showResults: false,
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

    const newCardNum = this.state.cardNum + 1

    // After going through all the cards, show results.
    if (newCardNum == maxCount) {
      this.setState({showResults: true})

      // Clear notifications for today since the user completed a quiz
      clearLocalNotification()
        .then(setLocalNotification)

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
        { showResults &&
          <View>
            <Divider />
            <Title styleName='h-center'>Score {numCorrect} / {numCards} </Title>
            <Divider />
            <TouchableOpacity
              style={styles.item}
              onPress={this.restart}>
              <Title>Restart Quiz</Title>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('DeckView', { deckId: deck.title })}
              >
              <Title>Back to Deck</Title>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => (navigation.navigate('Home'))}>
              <Title>Go Home</Title>
            </TouchableOpacity>
          </View>
        }

        { (card && !showResults) &&


          <View>

            <View style={styles.title}>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons name='cards-outline' size={30} />
                <Title style={{marginLeft: 8}}>{deck.title}</Title>
              </View>
              <View>
                {questionsRemaining > 1
                  ? <Title styleName={'v-center'}>Cards left: {questionsRemaining}</Title>
                  : <Title>Last Question!</Title>
                }
                </View>
            </View>
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

export default connect(mapStateToProps)(QuizContainer)
