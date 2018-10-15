import type { Action } from './types';
import Api from '../lib/api';

export const SET_DEVICE_USER_ID = 'SET_DEVICE_USER_ID';

export function setDeviceUserId(deviceId:string):Action {
  return {
    type: SET_DEVICE_USER_ID,
    payload: deviceId,
  };
}

export function updateDeviceUserId(parentId:number, deviceUserId:string):Action {
  return (dispatch, getState) => {
    const params = {
      parent_id: parentId,
      device_user_id: deviceUserId,
    };
    return Api.post('/updateDeviceUserId', params).then((resp) => {
      console.log(resp);
    }).catch((ex) => {
      console.log(ex);
    });
  };
}
