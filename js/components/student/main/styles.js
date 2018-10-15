
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
  header: {
    backgroundColor:'#eee',
    padding:25,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  },
  heading: {
    fontSize:18,
    lineHeight:26
  },
  picContainer:{
    width: 150,
    height:150,
    resizeMode:'cover',
    marginBottom:15,
    borderRadius:3,
  },
  note:{
    fontSize:14,
    lineHeight:18,
    color:'#777',
    fontWeight:'400',
  },
});
