import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Text, Title } from '@shoutem/ui'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from '../utils/styles'

class DeckView extends Component {

  startQuiz = () => {
    const { deck, navigation } = this.props
    navigation.navigate('QuizContainer', {
      'deckId': deck.title
    })
  }

  addCard = () => {
    const { deck, navigation } = this.props
    navigation.navigate('CardAdd', {
      'deckId': deck.title
    })
  }

  render () {
    const { deck, navigation } = this.props
    const deckLength = deck.questions.length
    const cardStr = deck.questions.length > 1 ? 'cards' : 'card'

    return (
      <View>

        <View style={styles.title}>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons name='cards-outline' size={30} />
            <Title style={{marginLeft: 8}}>{deck.title}</Title>
          </View>
          <View>
            <Title>{deck.questions.length} {cardStr}</Title>
          </View>
        </View>

        {deckLength > 0
          ? <TouchableOpacity
              style={[styles.item, {justifyContent: 'center'}]}
              onPress={this.startQuiz}>
              <Title>Start Quiz</Title>
            </TouchableOpacity>
          : <Text styleName='h-center'>Please add cards to your deck!</Text>
        }

        <TouchableOpacity
          style={[styles.item, {justifyContent: 'center'}]}
          onPress={this.addCard}>
          <Title>Add Card</Title>
        </TouchableOpacity>

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

export default connect(mapStateToProps)(DeckView)
