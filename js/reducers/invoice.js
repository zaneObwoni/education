import type { Action } from '../actions/types';
import { SET_INVOICE_INDEX, SET_INVOICE, SET_CREDITS, SET_ARREARS, SET_INVOICE_DOWNLOAD } from '../actions/invoice';

export type State = {
    selectedIndex: number,
    selectedSchool: number,
    invDate:string,
    lineItems: array,
    credit: array,
    arrears: object,
    html: string,
}

const initialState = {
  lineItems: [],
  selectedIndex: undefined,
  selectedSchool: undefined,
  invDate:'',
  credit: [],
  arrears: {},
  html: ''
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_INVOICE_INDEX) {
    return {
      ...state,
      selectedIndex: action.invoiceId,
      selectedSchool: action.schoolId,
      invoiceData: action.invoiceData,
    };
  }
  if (action.type === SET_INVOICE) {
    let lineItems = [];
    let totalAmt = 0;
    let amt;

    // build invoice line items
    action.lineItems.map( (item) => {
      amt = item.amount.split('.');
      lineItems.push({
        feeItem: item.fee_item,
        ksh: amt[0],
        cts: amt[1]
      });
      totalAmt += parseFloat(item.amount);
    });


    return {
      ...state,
      lineItems,
    };
  }
  if (action.type === SET_CREDITS) {
    return {
      ...state,
      credit: action.credit
    };
  }
  if (action.type === SET_ARREARS) {
    return {
      ...state,
      arrears: action.arrears
    };
  }
  if (action.type === SET_INVOICE_DOWNLOAD) {
    return {
      ...state,
      html: action.html
    }
  }
  return state;
}
