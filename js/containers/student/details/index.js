
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import { fetchStudentDetails } from '../../../actions/students';
import StudentDetails from '../../../components/student/details/';


const {
  popRoute,
  pushRoute
} = actions;

class StudentDetailsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    // TO DO: this will only need to run if data is stale
    this.props.fetchStudentDetails(this.props.school, this.props.studentId)
      .then( (res) => {
        this.setState({loading: false })
      });
  }

  render() {
    return (
      <StudentDetails {...this.props}
        isLoading={this.state.loading}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    fetchStudentDetails: (school,index) => dispatch(fetchStudentDetails(school,index)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  studentId: state.students.selectedIndex,
  school: state.students.selectedSchool,
  students: state.students.students,
  studentDetails: state.students.studentDetails
});


export default connect(mapStateToProps, bindAction)(StudentDetailsContainer);
