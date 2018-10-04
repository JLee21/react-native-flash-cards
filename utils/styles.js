import { StyleSheet, Platform } from 'react-native'
import * as colors from '../utils/colors'

export const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  disable: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#D3D3D6',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  textInput: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'space-between',
  },
  itemInverse: {
    color: colors.white,
    backgroundColor: colors.black,
  },
  questionView: {
    flexDirection: 'row',
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'space-between'
  },
  questionButtonView: {
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  questionText: {
    backgroundColor: colors.black,
    color: colors.white
  },
  questionsRemain: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    justifyContent: 'flex-end'
  },
  score: {
    // flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',

  }
})
