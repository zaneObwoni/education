
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  sidebar: {
    backgroundColor: '#fff',
  },
  sidebarHeader:{
    backgroundColor:'#397C49',
  },
  logo: {
    marginTop:35,
    marginLeft:16,
    marginBottom:10,
  },
  title: {
    backgroundColor:'#30603C',
    padding:10,
    paddingLeft:16,
  },
  userName:{
    color:'#fff',
    fontSize:20,
    lineHeight:18,
  },
  email:{
    color:'#fff',
    fontSize:14,
  },
  sidebarBody: {
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
    paddingTop: 5,
    paddingBottom:25,
    paddingLeft:16,
    paddingRight:16,
    marginBottom:25,
  },
  listCustom:{
    paddingTop:10,
    paddingBottom:10,
    position:'relative'
  },
  thumbnail: {
    width:24,
    height:24,
    borderRadius:24,
    position:'absolute',
    marginTop:1,
  },
  thumbnailIcon:{
    position:'absolute',
  },
  listItem:{
    marginLeft:35
  },
  sidebarFooter: {
    paddingTop: 25,
    paddingLeft:0,
    paddingRight:0
  }
});
