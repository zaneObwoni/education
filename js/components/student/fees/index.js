
import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Spinner } from 'native-base';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import PageHeader from '../../common/header';
import StudentHeader from '../../common/studentHeader';
import styles from '../styles';
import SummaryTab from './summaryTab';
import InvoicesTab from './invoicesTab';
import PaymentsTab from './paymentsTab';
import FeeItemsTab from './feeItemsTab';

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
export default class StudentFees extends Component {

  static propTypes = {
    studentId: React.PropTypes.number,
    students: React.PropTypes.object,
    balance: React.PropTypes.object,
    summary: React.PropTypes.array,
    invoices: React.PropTypes.array,
    payments: React.PropTypes.array,
    feeItems: React.PropTypes.array,
    fetchStudentInvoices: React.PropTypes.func,
    fetchStudentPayments: React.PropTypes.func,
    fetchStudentFeeItems: React.PropTypes.func,
    setInvoiceIndex: React.PropTypes.func,
    setPaymentIndex: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    const student = isNaN(this.props.studentId) ? undefined : this.props.students[this.props.studentId];

    return (
      <View style={styles.container}>
        <PageHeader
          title="Fees"
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
              <SummaryTab
                tabLabel="Summary"
                summary={this.props.summary}
                balance={this.props.balance}
              />
              <InvoicesTab
                tabLabel="Invoices"
                {...this.props}
              />
              <PaymentsTab
                tabLabel="Payments"
                {...this.props}
              />
              <FeeItemsTab
                tabLabel="FeeItems"
                studentId={this.props.studentId}
                school={this.props.school}
                fetchStudentFeeItems={this.props.fetchStudentFeeItems}
                feeItems={this.props.feeItems}
              />
            </ScrollableTabView>

            : <Text>Oops! Seems something went wrong . . .</Text>
          }
      </View>
    );
  }
}
