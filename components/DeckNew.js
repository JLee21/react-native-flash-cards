import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,
  TextInput, TextButton
} from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { AppLoading} from 'expo'

class DeckNew extends Component {
  state = {
    text: ''
  }
  handleSaveTitle = () => {
    console.log(this.state);
  }

  render () {
    const { navigation } = this.props

    return (
      <View>
        <Text>Create New Deck</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type here!"
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
