
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
  header:{
    marginBottom:5,
  },
  body:{
    marginBottom:15
  },
  schoolLetterhead:{
    //flex:1,
    //alignItems:'center',
    //justifyContent:'center',
  },
  letterHeadImg:{
    width:undefined,
    height:50,
    resizeMode:'contain',
  },
  reportTitle: {
    fontSize:16,
    textAlign:'center',
    color:'#000'
  },
  reportSubTitle: {
    fontSize:16
  },
  schoolHeader: {
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
  },
  schoolLogo: {
    flexGrow:1
  },
  address: {
    flexGrow:2
  },
  itemData:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    flexWrap:'wrap',
    marginBottom:3,
  },
  strong:{
    fontWeight:'bold',
  },
  center:{
    textAlign:'center',
  },
  reportCardBody:{
    padding:5,
  },
  reportCardContents:{
    width:1000,
    borderTopWidth:1,
    borderTopColor:'#bbb',
    marginTop:5,
  },
  kinderReportCardContents: {
    width:400,
    borderTopWidth:1,
    borderTopColor:'#bbb',
    marginTop:5,
  },
  rows:{
    flex:1,
    flexDirection:'row',
  },
  columns:{
    flex:1,
    flexDirection:'column',
  },
  cell:{
    borderRightWidth:1,
    borderRightColor:'#bbb',
    borderBottomWidth:1,
    borderBottomColor:'#bbb',
    flex:1,
    padding:2,
    justifyContent:'center',
    flexShrink:0,
  },
  subjectCol:{
    flexGrow:0,
    flexBasis:200,
  },
  single:{
    flexGrow:1,
    flexBasis:200,
  },
  half: {
    flexGrow:2,
    flexBasis:300,
  },
  quarter: {
    flexGrow:6,
    flexBasis:400,
  },
  third:{
    flexGrow:1,
    flexBasis:200,
  },
  heading:{
    fontSize:20,
    marginTop:10,
    marginBottom:5,
  },
  comments:{
    marginTop:5,
    lineHeight:18,
  },
  noRightBorder:{
    borderRightWidth:0,
  },
  checkIcon: {
    fontSize:20
  }
});
