
import type { Action } from '../actions/types';
import { SET_DEVICE_USER_ID } from '../actions/notifications';

export type State = {
    deviceId: string
}

const initialState = {
  deviceId: '',
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_DEVICE_USER_ID) {
    return {
      ...state,
      deviceId: action.payload,
    };
  }
  return state;
}
