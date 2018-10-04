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
    const { text } = this.state
    const title = text == '' ? 'Default Title' : this.state.text
    const deck = {
      title,
      questions: []
    }
    this.setState({text: ''})

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
        <TextInput
          style={styles.textInput}
          placeholder="Type a new deck title here ..."
          onChangeText={(text) => this.setState({text})}
        />
        <TouchableOpacity
          style={[styles.item, {justifyContent: 'center'}]}
          onPress={this.handleSaveTitle}>
          <Title>Save</Title>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(DeckNew)
