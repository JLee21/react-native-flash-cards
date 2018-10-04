import React, { Component } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Heading, Title, View } from '@shoutem/ui'
import { styles } from '../utils/styles'
import { addDeck } from '../actions'
import { submitDeck } from '../utils/api'

class DeckNew extends Component {
  state = {
    text: ''
  }
  handleSaveTitle = () => {
    const { dispatch, navigation } = this.props
    const { text } = this.state
    const title = text == '' ? 'Default Title' : this.state.text
    const deck = {
      title,
      questions: []
    }

    // Save to Store
    dispatch(addDeck(deck))

    // Save to AsyncStorage
    submitDeck(deck)

    this.setState({text: ''})

    navigation.navigate('DeckView', { deckId: title })

  }

  render () {
    const { navigation } = this.props

    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Type a new deck title here ..."
          onChangeText={(text) => this.setState({text})}
        />
        <TouchableOpacity
          style={styles.item}
          onPress={this.handleSaveTitle}>
          <Title>Save</Title>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(DeckNew)
