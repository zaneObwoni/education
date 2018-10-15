
import type { Action } from './types';
import Api from '../lib/api'

export const SET_STUDENT_BALANCE = 'SET_STUDENT_BALANCE';
export const SET_STUDENT_SUMMARY = 'SET_STUDENT_SUMMARY';
export const SET_STUDENT_INVOICES = 'SET_STUDENT_INVOICES';
export const SET_STUDENT_PAYMENTS = 'SET_STUDENT_PAYMENTS';
export const SET_STUDENT_FEE_ITEMS = 'SET_STUDENT_FEE_ITEMS';


/* fetch summary and balance */
export function fetchStudentFees(school:string, studentId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getStudentBalancePortal/${school}/${studentId}`).then(resp => {
      if (resp) {
        dispatch(setBalance({balance: resp.fee_summary}));
        dispatch(setSummary({summary: resp.fees}));
      }
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

function setBalance({ balance }):Action {
  return {
    type: SET_STUDENT_BALANCE,
    balance
  }
}

function setSummary({ summary }):Action {
  return {
    type: SET_STUDENT_SUMMARY,
    summary
  }
}

/* fetch invoices */
export function fetchStudentInvoices(school:string, studentId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getStudentInvoicesPortal/${school}/${studentId}`).then(resp => {
      console.log(resp);
      if (resp) {
        dispatch(setInvoices({invoices: resp}));
      }
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

function setInvoices({ invoices }):Action {
  return {
    type: SET_STUDENT_INVOICES,
    invoices
  }
}


/* fetch payments */
export function fetchStudentPayments(school:string, studentId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getStudentPaymentsPortal/${school}/${studentId}`).then(resp => {
      dispatch(setPayments({payments: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

function setPayments({ payments }):Action {
  return {
    type: SET_STUDENT_PAYMENTS,
    payments
  }
}

/* fetch fee items */
export function fetchStudentFeeItems(school:string, studentId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getStudentFeeItemsPortal/${school}/${studentId}`).then(resp => {
      dispatch(setFeeItems({feeItems: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

function setFeeItems({ feeItems }):Action {
  return {
    type: SET_STUDENT_FEE_ITEMS,
    feeItems
  }
}
