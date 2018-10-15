
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Content, Text, Icon, View, List, ListItem } from 'native-base';

import PageHeader from '../../common/header';
import styles from './styles';


export default class StudentMain extends Component {

  static propTypes = {
    studentId: React.PropTypes.number,
    school: React.PropTypes.string,
    students: React.PropTypes.object,
    openDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    let student = isNaN(this.props.studentId) ? undefined : this.props.students[this.props.studentId];
    return (

      <View style={styles.container}>
        <PageHeader
          title={student.student_name}
          menuBtn={true}
          menuBtnOnPress={this.props.openDrawer} />

      { student
        ? <Content>
            <View style={styles.header}>
              {
                student.student_image
                ? <Image style={styles.picContainer} source={{uri: `http://${student.school}.eduweb.co.ke/assets/students/${student.student_image}`}} />
                : <Icon name="md-happy" size={150} color="#000" />
              }
              <Text style={styles.heading}>{student.student_name}</Text>
            </View>
            <List>
              <ListItem button iconLeft iconRight
                onPress={() => this.pushRoute('studentBlog')} >
                <Icon name="md-megaphone" />
                <Text>Blog</Text>
                <Icon style={{color:'#ddd'}} name="md-arrow-forward" />
              </ListItem>
              <ListItem button iconLeft iconRight
                onPress={() => this.pushRoute('studentDetails')} >
                <Icon name="md-contact" />
                <Text>Student Details</Text>
                <Icon style={{color:'#ddd'}} name="md-arrow-forward" />
              </ListItem>
              <ListItem button iconLeft iconRight
                onPress={() => this.pushRoute('studentFees')} >
                <Icon name="md-pricetag" />
                <Text>Fees</Text>
                <Icon style={{color:'#ddd'}} name="md-arrow-forward" />
              </ListItem>
              <ListItem button iconLeft iconRight
                onPress={() => this.pushRoute('studentGrading')} >
                <Icon name="md-school" />
                <Text>Grading</Text>
                <Icon style={{color:'#ddd'}} name="md-arrow-forward" />
              </ListItem>
            </List>
          </Content>
        : <Content padder>
            <Text>Oops! Seems something went wrong . . .</Text>
          </Content>
      }
      </View>
    );
  }
}
