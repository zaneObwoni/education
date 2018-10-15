
import type { Action } from './types';
import Api from '../lib/api'
import { fetchStudentFees } from './fees';

export const SET_PAYMENT_INDEX = 'SET_PAYMENT_INDEX';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_RECEIPT_DOWNLOAD = 'SET_RECEIPT_DOWNLOAD';


export function setPaymentIndex(school:string, index:number, studentId:number):Action {
  return {
    type: SET_PAYMENT_INDEX,
    schoolId: school,
    paymentId:index,
    studentId:studentId,
  };
}

/* payment details */
export function fetchPaymentDetails(school:string, paymentId:number, studentId:number):Action {
  return (dispatch, getState) => Promise.all([
    dispatch(fetchPaymentLineItems(school, paymentId)),
    dispatch(fetchStudentFees(school, studentId)),
  ]);
}

export function fetchPaymentLineItems(school:string, paymentId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getPaymentDetails/${school}/${paymentId}`).then(resp => {
      dispatch(setPaymentDetails({lineItems: resp.paymentItems, paymentDetails: resp.payment, invoiceDetails: resp.invoice}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function setPaymentDetails({lineItems, paymentDetails, invoiceDetails}):Action {
  return {
    type: SET_PAYMENT,
    lineItems,
    paymentDetails,
    invoiceDetails
  };
}

/* receipt download */
export function downloadReceipt(html:string):Action {
  return {
    type: SET_RECEIPT_DOWNLOAD,
    html: html
  };
}
