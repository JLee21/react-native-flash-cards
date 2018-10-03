import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading} from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { white } from '../utils/colors'
import DeckView from './DeckView'
import { Heading, Title, View } from '@shoutem/ui'

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
      <View styleName='h-center' style={{marginTop: 10}}>
        <Heading styleName='h-center'>Working Title</Heading>
        {decks &&
          Object.keys(decks).map((key) => {
            return (
              <TouchableOpacity
                style={styles.item}
                key={key}
                onPress={() => navigation.navigate(
                  'DeckView',
                  { deckId: key }
              )}>
                <MaterialCommunityIcons name='cards-outline' size={30} />
                <Title>{decks[key].title}</Title>
                <Title>{decks[key].questions.length} cards</Title>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'space-between',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

function mapStateToProps ( { decks }, { navigation }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
