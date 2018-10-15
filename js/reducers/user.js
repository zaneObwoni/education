
import type { Action } from '../actions/types';
import {
  SET_USER,
  LOGIN_REQUEST,
  LOGIN_REQUIRED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CHECKING_USER,
  LOGGED_OUT,
} from '../actions/user';

export type State = {
    fullName: string,
    email: string,
    firstName: string,
    lastName: string,
    middleName: string,
    parentId: number
}

const initialState = {
  fullName: '',
  email: '',
  firstName: '',
  lastName: '',
  middleName: '',
  parentId: null,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === CHECKING_USER) {
    return {
      ...state,
      isCheckingUser: true,
      isLoggingIn: true,
      isAuthenticated: false,
    };
  }
  if (action.type === LOGIN_REQUEST) {
    return {
      ...state,
      isLoggingIn: true,
      isAuthenticated: false,
    };
  }
  if (action.type === LOGIN_REQUIRED) {
    return {
      ...state,
      isLoggingIn: false,
      isCheckingUser: false,
      isAuthenticated: false,
    };
  }
  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      isLoggingIn: false,
      isCheckingUser: true,
      isAuthenticated: true,
      user: action.user,
      deviceId: action.deviceId,
    };
  }
  if (action.type === LOGIN_FAILED) {
    return {
      ...state,
      isLoggingIn: false,
      isCheckingUser: false,
      isAuthenticated: false,
      loginError: true,
    };
  }
  if (action.type === LOGGED_OUT) {
    return {
      ...state,
      isLoggingIn: false,
      isCheckingUser: false,
      isAuthenticated: false,
      loginError: false,
      user: null,
      deviceId: null,
    };
  }
  return state;
}
