
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import {
  fetchStudentFees,
  fetchStudentInvoices,
  fetchStudentPayments,
  fetchStudentFeeItems
} from '../../../actions/fees';

import { setInvoiceIndex } from '../../../actions/invoice';
import { setPaymentIndex } from '../../../actions/payment';
import StudentFees from '../../../components/student/fees/';

const {
  popRoute,
  pushRoute
} = actions;

class StudentFeesContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    // TO DO: this will only need to run if data is stale
    this.props.fetchStudentFees(this.props.school, this.props.studentId).then( (res) => {
      this.setState({loading: false })
    });
  }

  render() {
    return (
      <StudentFees {...this.props}
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
    fetchStudentFees: (school,index) => dispatch(fetchStudentFees(school,index)),
    fetchStudentInvoices: (school,index) => dispatch(fetchStudentInvoices(school,index)),
    fetchStudentPayments: (school,index) => dispatch(fetchStudentPayments(school,index)),
    fetchStudentFeeItems: (school,index) => dispatch(fetchStudentFeeItems(school,index)),
    setInvoiceIndex: (school,index,invDate) => dispatch(setInvoiceIndex(school,index,invDate)),
    setPaymentIndex: (school,index) => dispatch(setPaymentIndex(school,index))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  studentId: state.students.selectedIndex,
  school: state.students.selectedSchool,
  students: state.students.students,
  summary: state.fees.summary,
  invoices: state.fees.invoices,
  payments: state.fees.payments,
  feeItems: state.fees.feeItems,
  balance: state.fees.balance,
});

export default connect(mapStateToProps, bindAction)(StudentFeesContainer);
