
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import StudentMain from '../../../components/student/main/';
import { fetchSchoolDetails } from '../../../actions/school';
import { openDrawer } from '../../../actions/drawer';

const {
  pushRoute,
} = actions;

class StudentContainer extends Component {
  componentWillMount() {
    if( !this.props.schoolDetails || !this.props.schoolDetails[this.props.school] ) {
      // pull school details
      this.props.fetchSchoolDetails(this.props.school).then( (res) => {
        console.log(this.props.schoolDetails)
        this.setState({loading1: false })
      });
    }
  }

  render() {
    return (
      <StudentMain {...this.props} />
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    fetchSchoolDetails: school => dispatch(fetchSchoolDetails(school)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  fullName: state.user.fullName,
  studentId: state.students.selectedIndex,
  school: state.students.selectedSchool,
  students: state.students.students,
  schoolDetails: state.school.schoolDetails
});

export default connect(mapStateToProps, bindAction)(StudentContainer);
