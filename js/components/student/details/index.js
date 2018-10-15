
import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Spinner } from 'native-base';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import PageHeader from '../../common/header';
import StudentHeader from '../../common/studentHeader';
import DetailsTab from './detailsTab';
import FamilyTab from './familyTab';
import MedicalTab from './medicalTab';
import EnrolledTab from './enrolledTab';

import styles from './styles';

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
export default class StudentDetails extends Component {

  static propTypes = {
    isLoading: React.PropTypes.bool,
    studentId: React.PropTypes.number,
    students: React.PropTypes.object,
    student: React.PropTypes.object,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    const student = isNaN(this.props.studentId) ? undefined : this.props.students[this.props.studentId];
    const details = this.props.studentDetails;

    return (
      <View style={styles.container}>
        <PageHeader
          title="Student Details"
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
                  <DetailsTab tabLabel="Details" student={student} />
                  <FamilyTab tabLabel="Family" details={details} />
                  <MedicalTab tabLabel="Medical" details={details} />
                  <EnrolledTab tabLabel="Enrolled" details={details} />
                </ScrollableTabView>

                : <Text>Oops! Seems something went wrong . . .</Text>
          }

      </View>
    );
  }
}
