
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0
  },
  pageHeader: {
    backgroundColor: '#397C49'
  },
  header: {
    backgroundColor:'#eee',
    padding: 15
  },
  heading: {
    fontSize:18,
    lineHeight:26
  },
  note:{
    fontSize:14,
    lineHeight:18,
    color:'#777',
    fontWeight:'400',
  },
  pic:{
    width: undefined,
    height:150,
    resizeMode:'cover',
    marginBottom:10
  },
  attachment:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'flex-start',
    backgroundColor:'#eee',
    borderWidth:1,
    borderColor:'#ddd',
    borderTopWidth:0,
    padding:15,
  },
  attachmentIcon:{
    marginRight:3,
    fontSize:16
  },
  link:{
    borderBottomWidth:1,
    paddingBottom:1,
    marginLeft:5,
  },
  strong:{
    fontWeight:'bold',
  },
});
