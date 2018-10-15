
import type { Action } from '../actions/types';
import {
  SET_STUDENT_SUMMARY,
  SET_STUDENT_BALANCE,
  SET_STUDENT_INVOICES,
  SET_STUDENT_PAYMENTS,
  SET_STUDENT_FEE_ITEMS
} from '../actions/fees';

export type State = {
    summary: array,
    balance: object,
    invoices: array,
    payments: array,
    feeItems: array
}

const initialState = {
  summary: [],
  balance: {},
  invoices: [],
  payments: [],
  feeItems: []
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_STUDENT_SUMMARY) {
    return {
      ...state,
      summary: action.summary,
    };
  }
  if (action.type === SET_STUDENT_BALANCE) {
    return {
      ...state,
      balance: action.balance
    };
  }
  if (action.type === SET_STUDENT_INVOICES) {
    return {
      ...state,
      invoices: action.invoices,
    };
  }
  if (action.type === SET_STUDENT_PAYMENTS) {
    return {
      ...state,
      payments: action.payments
    }
  }
  if (action.type === SET_STUDENT_FEE_ITEMS) {
    return {
      ...state,
      feeItems: action.feeItems
    }
  }
  return state;
}
