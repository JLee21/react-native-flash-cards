import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { AppLoading} from 'expo'

class DeckList extends Component {
  state = {
    loading: true,
  }

  componentDidMount () {
    const { dispatch } = this.props

    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({loading: false})))
  }

  render () {
    const { loading } = this.state

    if (loading) {
      return <AppLoading />
    }

    return (
      <View>
        <Text>This is the Meow</Text>
      </View>
    )
  }
}

function mapStateToProps ( { decks }, { navigation }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
