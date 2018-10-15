
import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Spinner } from 'native-base';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import PageHeader from '../../common/header';
import StudentHeader from '../../common/studentHeader';
import styles from '../styles';
import ExamsTab from './examsTab';
import ReportCardsTab from './reportCardsTabs';

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
export default class StudentGrading extends Component {

  static propTypes = {
    studentId: React.PropTypes.number,
    students: React.PropTypes.object,
    classes: React.PropTypes.array,
    terms: React.PropTypes.array,
    exams: React.PropTypes.object,
    reportCards: React.PropTypes.array,
    setReportIndex: React.PropTypes.func,
    fetchCurrentTerm: React.PropTypes.func,
    fetchAllGradingData: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
/*
  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
*/
  render() {
    const student = isNaN(this.props.studentId) ? undefined : this.props.students[this.props.studentId];

    return (
      <View style={styles.container}>
        <PageHeader
          title="Grading"
          backBtn
          backBtnOnPress={() => this.popRoute()}
        />

        <StudentHeader student={student} />

        { this.props.isLoading
          ? <View><Spinner color="green" /></View>
          : student
            ? <ScrollableTabView
              tabBarBackgroundColor={'#333'}
              tabBarActiveTextColor={'#fff'}
              tabBarInactiveTextColor={'#fff'}
              tabBarUnderlineStyle={{ backgroundColor: '#fff' }}
              tabBarTextStyle={{ fontFamily, fontSize: 15, lineHeight: 30 }}
            >
              <ReportCardsTab
                tabLabel="Report Cards"
                {...this.props}
              />
              <ExamsTab
                tabLabel="Exam Marks"
                {...this.props}
              />
            </ScrollableTabView>
            : <Text>Oops! Seems something went wrong . . .</Text>
        }
      </View>
    );
  }
}
