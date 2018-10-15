
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
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
  sectionTitle:{
    color: '#009e0f',
  },
  itemData:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    flexWrap:'wrap'
  },
  itemValue: {
    fontSize: 15,
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

});
