
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import { fetchInvoiceDetails } from '../../actions/invoice';
import Invoice from '../../components/invoice/';
import { downloadInvoice } from '../../actions/invoice';
import { openDrawer } from '../../actions/drawer';

const {
  popRoute,
} = actions;

class InvoiceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    // TO DO: this will only need to run if data is stale
    this.props.fetchInvoiceDetails(this.props.school, this.props.invoiceId, this.props.invoiceData.inv_date).then( (res) => {
      this.setState({loading: false })
    });
  }

  render() {
    return (
      <Invoice {...this.props}
        isLoading={this.state.loading} />
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    downloadInvoice: html => dispatch(downloadInvoice(html)),
    fetchInvoiceDetails: (school,invId,invDate) => dispatch(fetchInvoiceDetails(school,invId,invDate)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  invoiceId: state.invoice.selectedIndex,
  school: state.invoice.selectedSchool,
  invoiceData: state.invoice.invoiceData,
  lineItems: state.invoice.lineItems,
  credit: state.invoice.credit,
  arrears: state.invoice.arrears,
  schoolDetails: state.school.schoolDetails,
  students: state.students.students,
  studentId: state.students.selectedIndex,
});


export default connect(mapStateToProps, bindAction)(InvoiceContainer);
