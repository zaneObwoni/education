
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import { downloadReport } from '../../actions/grading';
import { openDrawer } from '../../actions/drawer';

import ReportCard from '../../components/reportCard/';

const {
    popRoute,
} = actions;

class ReportCardContainer extends Component {
    render() {
        return (
            <ReportCard {...this.props} />
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        popRoute: key => dispatch(popRoute(key)),
        downloadReport: html => dispatch(downloadReport(html)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    reportData: state.grading.reportData,
    comments: state.grading.reportCards,
    school: state.students.selectedSchool,
    studentId: state.students.selectedIndex,
    students: state.students.students,
    schoolDetails: state.school.schoolDetails,
    examTypes: state.grading.examTypes,
});


export default connect(mapStateToProps, bindAction)(ReportCardContainer);
