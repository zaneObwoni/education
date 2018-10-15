import React, { Component } from 'react';
import ReactNative from 'react-native';
import { Image } from 'react-native';
import { View, Icon, Text } from 'native-base';
const { StyleSheet } = ReactNative;

export default class StudentHeader extends Component {

  static propTypes = {
    student: React.PropTypes.object.isRequired,
  }

  render() {
    let student = this.props.student;
    return (
      <View style={styles.studentHeader}>
        {
          student.student_image
          ? <Image style={styles.picContainer} source={{uri: `http://${student.school}.eduweb.co.ke/assets/students/${student.student_image}`}} />
          : <Icon name="md-happy" size={50} color="#000" />
        }
        <Text style={styles.studentHeading}>{student.student_name.toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  studentHeader: {
    backgroundColor:'#eee',
    padding:15,
    flexDirection:'row',
    alignItems:'center',
  },
  picContainer:{
    width: 42,
    height:42,
    borderRadius:3,
    position:'absolute',
    top:8,
    left:7,
  },
  studentHeading:{
    marginLeft:46,
  },
});
