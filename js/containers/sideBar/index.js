
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { View, Image, TouchableOpacity } from 'react-native';
import { Content, Text, List, ListItem, Icon } from 'native-base';

import SideBar from '../../components/sideBar/';
import { closeDrawer } from '../../actions/drawer';
import { clearUser } from '../../actions/user';
import { setStudentIndex } from '../../actions/students';
import navigateTo from '../../actions/sideBarNav';

const {
  pushRoute,
  replaceAt
} = actions;

class SideBarContainer extends Component {
  render() {
    return (
      <SideBar {...this.props} />
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setStudentIndex: index => dispatch(setStudentIndex(index)),
    clearUser: () => dispatch(clearUser()),
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  fullName: state.user.fullName,
  navigation: state.cardNavigation,
  students: state.students.students,
  studentId: state.students.selectedIndex,
});

export default connect(mapStateToProps, bindAction)(SideBarContainer);
