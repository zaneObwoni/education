
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import Home from '../../components/home/';
import { openDrawer } from '../../actions/drawer';
import { fetchStudents, setStudentIndex, setStudentSchool } from '../../actions/students';
import { setNewsIndex } from '../../actions/news';

const {
  pushRoute,
} = actions;

class HomeContainer extends Component {

  render() {
    return (
      <Home {...this.props} />
    );
  }
}

function bindAction(dispatch) {
  return {
    setStudentIndex: index => dispatch(setStudentIndex(index)),
    setStudentSchool: school => dispatch(setStudentSchool(school)),
    setNewsIndex: (school, index) => dispatch(setNewsIndex(school,index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  fullName: state.user.fullName,
  students: state.students.students,
  news: state.news.news,
  navigation: state.cardNavigation,
  isFetching: state.students.isFetching
});

export default connect(mapStateToProps, bindAction)(HomeContainer);
