
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container:{
    backgroundColor:'#FBFAFA',
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  box: {
    flexBasis:350,
    flex:1,
    flexGrow:0,
    flexDirection:'column',
    padding:10,
    backgroundColor:'#eee',
    marginRight:1,
    marginBottom:1,
  },
  name: {
    fontSize:16,
    lineHeight:20,
    fontWeight:'700',
    marginBottom:5,
    textAlign:'center'
  },
  note:{
    fontSize:14,
    lineHeight:16,
    color:'#777',
    textAlign:'center'
  },
  picContainer:{
    width: undefined,
    height:150,
    resizeMode:'cover',
    marginBottom:15,
    borderRadius:3,
    justifyContent:'flex-start'
  },
  studentIcon:{
    fontSize:100,
    textAlign:'center'
  },
  newsContainer: {
    padding:10
  },
  heading: {
    fontSize:24,
  },
  schoolHeading: {
    color:'#009e0f',
  },
  itemContainer: {
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
    flexDirection: 'row',
    margin:0,
    padding:7,
    position:'relative',
  },
  newsIcon: {
    position:'absolute',
    padding:2,
  },
  news: {
    marginLeft:40,
  },
  subject: {
    fontSize:16,
    lineHeight:20,
    fontWeight:'600'
  },
  newsNote:{
    fontSize:12,
    lineHeight:16,
    color:'#777',
    fontStyle:'italic',
  },
});
