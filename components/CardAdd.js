import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { Divider, Title } from '@shoutem/ui'
import { styles } from '../utils/styles'
import { addCard } from '../actions'

class DeckNew extends Component {

  static navigationOptions = {
    title: 'Add Card',
  };

  state = {
    textQuestion: '',
    textAnswer: '',
  }

  handleSubmit = () => {
    const { deckId, dispatch, navigation } = this.props
    const { textQuestion, textAnswer } = this.state

    const card = {
      deckId,
      question: {
        question: this.state.textQuestion,
        answer: this.state.textAnswer
      }
    }
    // Save to Store and update AsyncStorage
    dispatch(addCard(card))

    navigation.goBack()
  }

  render () {
    const { navigation } = this.props
    const { textQuestion, textAnswer } = this.state
    const disable = !(textQuestion && textAnswer)

    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Type the question here ..."
          onChangeText={(text) => this.setState({ textQuestion: text})}
        />
        <Divider styleName="line" />
        <TextInput
          style={styles.textInput}
          placeholder="Type the answer here ..."
          onChangeText={(text) => this.setState({ textAnswer: text })}
        />
        <TouchableOpacity
          style={disable
            ? styles.disable
            : styles.item}
          disabled={disable}
          onPress={this.handleSubmit}>
          <Title>Add</Title>
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

export default connect(mapStateToProps)(DeckNew)
