
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import { fetchPaymentDetails, downloadReceipt } from '../../actions/payment';
import { openDrawer } from '../../actions/drawer';

import Payment from '../../components/payment/';

const {
  popRoute,
} = actions;

class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    // TO DO: this will only need to run if data is stale
    this.props.fetchPaymentDetails(this.props.school, this.props.paymentId, this.props.studentId).then( (res) => {
      this.setState({loading: false })
    });
  }

  render() {
    return (
      <Payment {...this.props}
        isLoading={this.state.loading} />
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    downloadReceipt: html => dispatch(downloadReceipt(html)),
    fetchPaymentDetails: (school,paymentId,studentId) => dispatch(fetchPaymentDetails(school,paymentId,studentId)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  paymentId: state.payment.selectedIndex,
  school: state.payment.selectedSchool,
  studentId: state.students.selectedIndex,
  students: state.students.students,
  lineItems: state.payment.lineItems,
  paymentDetails: state.payment.paymentDetails,
  feeSummary: state.fees.balance,
  schoolDetails: state.school.schoolDetails
});


export default connect(mapStateToProps, bindAction)(PaymentContainer);
