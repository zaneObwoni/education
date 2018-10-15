
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  summaryContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    flexBasis:200,
    backgroundColor:'#eee',
    marginLeft:-15,
    marginRight:-15,
    marginBottom:10,
  },
  summaryBox: {
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    borderRightWidth:1,
    borderRightColor:'#fff'
  },
  summaryTitle:{
    fontSize:14,
  },
  summaryAmt:{
    fontSize:22,
  },
  itemContainer:{
    paddingTop:1,
    paddingBottom:5,
    borderBottomWidth:1,
    borderBottomColor:'#bbb',
    marginBottom:1,
    position:'relative',
  },
  itemHeader:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  itemTitle: {
    fontSize:14,
    paddingBottom:2,
    flex:1,
    color:'#000'
  },
  balanceContainer: {
    paddingBottom:5,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
  },
  balanceDesc: {
    fontSize: 12,
    paddingRight:10,
  },
  balance:{
    fontSize:18,
  },
  muted:{
    fontSize:14
  },
  itemData:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    flexWrap:'wrap'
  },
  itemMeta: {
    fontSize:12,
    color: '#777',
  },
  strong:{
    fontWeight:'bold',
  },
  note:{
    fontSize:12,
    lineHeight:16,
    color:'#777',
    fontStyle:'italic',
  },
  reversedWatermark: {
    position:'absolute',
    top:0,
    right:-5,
    left:-5,
    bottom:0,
    backgroundColor:'rgba(169,68,66,0.5)',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  reverseText:{
    color:'#fff',
    fontSize:40,
  }

});
