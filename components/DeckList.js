import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading} from 'expo'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import DeckView from './DeckView'

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
    const { decks, navigation } = this.props

    decks && Object.keys(decks).map((key) => {
      console.log(key);
    })

    if (loading) {
      return <AppLoading />
    }

    return (
      <View>
        <Text>Deck List</Text>
        {decks &&
          Object.keys(decks).map((key) => {
            return (
              <TouchableOpacity key={key} onPress={() => navigation.navigate(
                'DeckView',
                { deckId: key }
              )}>
                <Text>{decks[key].title}</Text>
                <Text>{decks[key].questions.length}</Text>
                <TouchableOpacity onPress={() => {console.log('Meow')}}>
                  <Text>Test</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )
          })
        }
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
