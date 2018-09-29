import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,
  TextInput, TextButton
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { fetchDecks, submitDeck } from '../utils/api'
import { AppLoading} from 'expo'

class DeckNew extends Component {
  state = {
    text: 'NewDefault'
  }
  handleSaveTitle = () => {
    console.log(this.state);
    const deck = {
      title: this.state.text,
      questions: []
    }

    // Save to Store
    this.props.dispatch(addDeck(deck))

    // Save to AsyncStorage
    submitDeck(deck)

    this.props.navigation.navigate('Home')

  }

  render () {
    const { navigation } = this.props

    return (
      <View>
        <Text>Create New Deck</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type new deck title here ..."
          onChangeText={(text) => this.setState({text})}
        />
        <TouchableOpacity
          onPress={this.handleSaveTitle}>
            <Text>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps ( { decks }, { navigation }) {
  // const { deckId } = navigation.state.params
  //
  return {
    // deckId,
    // deck: decks[deckId]
  }
}

function mapDispatchToProps () {

}

export default connect(mapStateToProps)(DeckNew)
