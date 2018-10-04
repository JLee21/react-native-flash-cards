import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Font, AppLoading } from 'expo';
import { FontAwesome, Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import middleware from './middleware'
import { fetchDecks } from './utils/api'
import { setLocalNotification } from './utils/notifications'
import { receiveDecks } from './actions'
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import DeckNew from './components/DeckNew'
import CardAdd from './components/CardAdd'
import QuizContainer from './components/QuizContainer'
import QuizCard from './components/QuizCard'

const store = createStore(reducer, composeWithDevTools(middleware))

const Tabs = createBottomTabNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  DeckNew: {
    screen: DeckNew,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      }
    },
    navigationOptions: {
      tabBarLabel: 'Create Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='new-message' size={25} color={tintColor} />
    },
  }
})

const MainStack = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        title: 'Flash Cards'
      },
    },
    DeckList: {
      screen: DeckList
    },
    DeckView: {
      screen: DeckView
    },
    CardAdd: {
      screen: CardAdd
    },
    QuizContainer: {
      screen: QuizContainer
    },
    QuizCard: {
      screen: QuizCard
    },
  }
)

export default class App extends React.Component {
  state = {
    fontsAreLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });
    this.setState({ fontsAreLoaded: true });
  }

  componentDidMount() {
    setLocalNotification()
  }

  render() {

    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MainStack />
        </View>
      </Provider>
    );
  }
}
