
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  note:{
    fontSize:14,
    lineHeight:18,
    color:'#777',
    fontWeight:'400',
  },
  list: {
    borderBottomWidth:1,
    borderBottomColor:'#eee',
    padding:16
  },
  name: {
    fontSize:16,
    lineHeight:18,
    fontWeight:'600',
  },
  meta: {
    fontSize:16
  },
  highlight: {
    fontWeight:'600'
  }
});
