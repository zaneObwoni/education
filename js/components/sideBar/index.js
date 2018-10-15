
import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Content, Text, List, ListItem, Icon } from 'native-base';

import myTheme from '../../themes/sidebar-theme';
import styles from './style';
const background = require('../../../images/eduweb-logo-sidebar-100.png');

export default class SideBar extends Component {

  static propTypes = {
    fullName: React.PropTypes.string,
    students: React.PropTypes.object,
    setStudentIndex: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    studentId: React.PropTypes.number,
    clearUser: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  loadStudent(route, index) {
    this.props.setStudentIndex(index);
    this.props.navigateTo(route, 'home');
  }

  logout(){
    this.props.clearUser().then((res) => {
      this.props.closeDrawer();
      this.props.replaceAt('home', { key: 'login' }, this.props.navigation.key);
    });
  }

  render() {
    let selectedStudent = isNaN(this.props.studentId) ? undefined : this.props.students[this.props.studentId];
    return (
      <Content theme={myTheme} style={styles.sidebar}>
        <View style={styles.sidebarHeader}>
          <Image source={background} style={styles.logo}></Image>
          <View style={styles.title}>
            <Text style={styles.userName}>{this.props.fullName}</Text>
          </View>
        </View>
        <View style={styles.sidebarBody}>
          <List>
            <TouchableOpacity
              style={styles.listCustom}
              onPress={() => this.navigateTo('home')} >
              <Icon style={styles.thumbnailIcon} name="md-home" />
              <Text style={styles.listItem}>HOME</Text>
            </TouchableOpacity>
          </List>
          <List dataArray={this.props.students}
            renderRow={(student) =>
              <TouchableOpacity
                style={styles.listCustom}
                onPress={() => this.loadStudent('studentMain', student.student_id)}>
                {
                  student.student_image
                  ? <Image style={styles.thumbnail} source={{uri: `http://${student.school}.eduweb.co.ke/assets/students/${student.student_image}`}} />
                  : <Icon style={styles.thumbnailIcon} name="md-school" />
                }
                <Text style={styles.listItem}>{student.student_name.toUpperCase()}</Text>
              </TouchableOpacity>
            }>
          </List>
          <List>
            <TouchableOpacity
              style={styles.listCustom}
              onPress={() => this.navigateTo('account')} >
              <Icon style={styles.thumbnailIcon} name="md-settings" />
              <Text style={styles.listItem}>CHANGE PASSWORD</Text>
            </TouchableOpacity>
          </List>
        </View>
        <View style={styles.sidebarFooter}>
          <List>
            <ListItem iconRight button
              onPress={() => this.logout()}>
              <Icon name="md-exit" />
              <Text>LOG OUT</Text>
              <Text note>{this.props.fullName}</Text>
            </ListItem>
          </List>
        </View>
      </Content>
    );
  }
}
