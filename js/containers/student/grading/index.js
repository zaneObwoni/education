
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import {
  fetchStudentReportCards,
  fetchStudentClasses,
  fetchStudentTerms,
  setReportIndex,
  fetchStudentExams,
  fetchAllGradingData,
  fetchCurrentTerm
} from '../../../actions/grading';

import StudentGrading from '../../../components/student/grading/';

const {
  popRoute,
  pushRoute
} = actions;

class StudentGradingContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    // TO DO: this will only need to run if data is stale
    this.props.fetchStudentReportCards(this.props.school, this.props.studentId).then( (res) => {
      this.setState({loading: false })
    });

  }

  render() {
    return (
      <StudentGrading {...this.props}
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
    fetchStudentReportCards: (school, index) => dispatch(fetchStudentReportCards(school,index)),
    fetchStudentClasses: (school, index) => dispatch(fetchStudentClasses(school,index)),
    fetchStudentTerms: (school, index) => dispatch(fetchStudentTerms(school,index)),
    setReportIndex: (school, reportData) => dispatch(setReportIndex(school,reportData)),
    fetchStudentExams: (school, studentId, classId, termId) => dispatch(fetchStudentExams(school, studentId, classId, termId)),
    fetchAllGradingData: (school, studentId) => dispatch(fetchAllGradingData(school, studentId)),
    fetchCurrentTerm: school => dispatch(fetchCurrentTerm(school)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  studentId: state.students.selectedIndex,
  school: state.students.selectedSchool,
  students: state.students.students,
  reportCards: state.grading.reportCards,
  classes: state.grading.classes,
  terms: state.grading.terms,
  currentTerm: state.grading.currentTerm,
  exams: state.grading.exams
});

export default connect(mapStateToProps, bindAction)(StudentGradingContainer);
