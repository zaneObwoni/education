
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor:'#397C49'
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
    backgroundColor: '#FBFAFA',
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor:'#009e0f',
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 15,
  },
  error: {
    position:'absolute',
    top:122,
    left:10,
    right:10,
    zIndex:9999,
    padding:5,
    backgroundColor:'#F2DEDE',
    color:'#A94442',
    textAlign:'center'
  }
});
