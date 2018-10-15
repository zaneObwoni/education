import type { Action } from '../actions/types';
import { SET_PAYMENT_INDEX, SET_PAYMENT, SET_RECEIPT_DOWNLOAD } from '../actions/payment';

export type State = {
    selectedIndex: number,
    selectedSchool: number,
    lineItems: array,
    html: string,
    paymentDetails: object,
}

const initialState = {
  lineItems: [],
  selectedIndex: undefined,
  selectedSchool: undefined,
  html: '',
  paymentDetails: {}
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_PAYMENT_INDEX) {
    return {
      ...state,
      selectedIndex: action.paymentId,
      selectedSchool: action.schoolId,
      selectedStudent: action.studentId
    };
  }
  if (action.type === SET_PAYMENT) {
    let lineItems = [];
    let totalAmt = 0;
    let amt;

    // build payment line items
    action.lineItems.map( (item) => {
      amt = item.line_item_amount.split('.');
      lineItems.push({
        invId: item.inv_id,
        feeItem: item.fee_item,
        ksh: amt[0],
        cts: amt[1]
      });
      totalAmt += parseFloat(item.line_item_amount);
    });

    // total amount is an array of [ksh,cts]
    totalAmt = String(totalAmt).indexOf('.') > -1 ? String(totalAmt).split('.') : [totalAmt,'00'];

    // build receipt header
    let term = action.invoiceDetails[0].term_name.split(' ');
    let paymentData = {
      paymentDate: action.paymentDetails.payment_date,
      termName: term[0],
      termYear: term[1],
      receiptNumber: action.paymentDetails.payment_id,
      amount: action.paymentDetails.amount,
      slipChequeNo: action.paymentDetails.slip_cheque_no,
      reversed: action.paymentDetails.reversed,
      totalAmt: totalAmt
    };

    return {
      ...state,
      lineItems: lineItems,
      paymentDetails: paymentData,
    };
  }
  if (action.type === SET_RECEIPT_DOWNLOAD) {
    return {
      ...state,
      html: action.html
    }
  }
  return state;
}
