import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading} from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Title, View } from '@shoutem/ui'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import DeckView from './DeckView'
import { styles } from '../utils/styles'
import { getCardStr } from '../utils/helper'

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

    if (loading) {
      return <AppLoading />
    }

    return (
      <View style={{marginTop: 10}}>
        {decks &&
          Object.keys(decks).map((key) => {
            const cardStr = getCardStr(decks[key])

            return (
              <TouchableOpacity
                style={styles.itemList}
                key={key}
                onPress={() => navigation.navigate(
                  'DeckView',
                  { deckId: key }
              )}>
                <MaterialCommunityIcons name='cards-outline' size={30} />
                <Title>{decks[key].title}</Title>
                <Title>{decks[key].questions.length} {cardStr}</Title>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}

function mapStateToProps ( { decks } ) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
