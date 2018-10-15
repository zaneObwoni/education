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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  blogContainer: {
    position:'relative'
  },
  heading: {
    fontSize:16,
    color: '#000',
    paddingBottom:5,
  },
  blogEntry: {
    paddingTop:5,
    paddingBottom:15,
    borderBottomWidth:1,
    borderBottomColor:'#bbb',
    marginBottom:10,
    position:'relative',
  },
  blogTitle: {
    fontSize:30,
    color: '#009e0f',
    paddingBottom:5,
  },
  homeworkTitle: {
    fontSize:20,
    color: '#009e0f',
    paddingBottom:5,
  },
  published:{
    fontSize:14,
    lineHeight:16,
    color:'#777',
    marginBottom:5
  },
  picContainer:{
    width: undefined,
    height:150,
    resizeMode:'cover',
    marginBottom:15,
    borderRadius:3,
  },
  newsNote:{
    fontSize:12,
    lineHeight:16,
    color:'#777',
    fontStyle:'italic',
  },
  moreBtn:{
    flex:1,
    alignItems:'center',
    padding:15,
    marginBottom:10
  },
  moreBtnText:{
    color:'#009e0f',
    fontSize:16
  },
  homeworkHeader:{
    marginBottom:10,
  },
  strong:{
    fontWeight:'bold',
  },
  highlight:{
    fontSize:14,
    color:'#000',
    fontWeight:'bold',
  },
  attachment:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'flex-start',
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
  pdf:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex:1,
  }
});
