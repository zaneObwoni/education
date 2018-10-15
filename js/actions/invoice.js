
import type { Action } from './types';
import Api from '../lib/api'

export const SET_INVOICE_INDEX = 'SET_INVOICE_INDEX';
export const SET_INVOICE = 'SET_INVOICE';
export const SET_CREDITS = 'SET_CREDITS';
export const SET_ARREARS = 'SET_ARREARS';
export const SET_INVOICE_DOWNLOAD = 'SET_INVOICE_DOWNLOAD';


export function setInvoiceIndex(school:string, index:number, invoiceData:object):Action {
  return {
    type: SET_INVOICE_INDEX,
    schoolId: school,
    invoiceId:index,
    invoiceData:invoiceData
  };
}

/* invoice details */
export function fetchInvoiceDetails(school:string, invoiceId:number, invDate:string):Action {
  return (dispatch, getState) => Promise.all([
    dispatch(fetchInvoiceLineItems(school, invoiceId)),
    dispatch(fetchStudentCredits(school, invoiceId)),
    dispatch(fetchStudentArrears(school, invoiceId, invDate)),
  ]);
}

export function fetchInvoiceLineItems(school:string, invoiceId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getInvoiceDetails/${school}/${invoiceId}`).then(resp => {
      dispatch(setInvoiceDetails({lineItems: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function setInvoiceDetails({lineItems}):Action {
  return {
    type: SET_INVOICE,
    lineItems,
  };
}

/* credit details */
export function fetchStudentCredits(school:string, studentId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getStudentCreditsPortal/${school}/${studentId}`).then(resp => {
      dispatch(setStudentCredits({credit: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function setStudentCredits({credit}):Action {
  return {
    type: SET_CREDITS,
    credit,
  };
}

/* arrears details */
export function fetchStudentArrears(school:string, studentId:number, invDate:string):Action {
  return (dispatch, getState) => {
    return Api.get(`/getStudentArrearsPortal/${school}/${studentId}/${invDate}`).then(resp => {
      dispatch(setStudentArrears({arrears: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function setStudentArrears({arrears}):Action {
  return {
    type: SET_ARREARS,
    arrears,
  };
}

/* invoice download */
export function downloadInvoice(html:string):Action {
  return {
    type: SET_INVOICE_DOWNLOAD,
    html: html
  };
}
