import store from 'react-native-simple-store';
import type { Action } from './types';
import Api from '../lib/api';
import { actions } from 'react-native-navigation-redux-helpers';
import { setStudents, fetchStudents } from './students';
import { setNews } from './news';
import { updateDeviceUserId } from './notifications';
import axios from "axios";

const {
    reset,
} = actions;

// export const SET_USER = 'SET_USER';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUIRED = 'LOGIN_REQUIRED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const CHECKING_USER = 'CHECKING_USER';
export const LOGGED_OUT = 'LOGGED_OUT';
export const RESET_PASS = 'RESET_PASS';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILED = 'RESET_FAILED';

function loginRequest() {
    return {
        type: LOGIN_REQUEST,
    };
}

function checkingUser() {
    return {
        type: CHECKING_USER,
    };
}

function loginRequired() {
    return {
        type: LOGIN_REQUIRED,
    };
}

export function checkUser():Action {
    return (dispatch, getState) => {
        dispatch(checkingUser());

        return store
            .get('UserSession')
            .then((user) => {
                if (user !== null) {
                    // We have data!!
                    dispatch(fetchStudents(user.parentId));
                    dispatch(loginSuccess(user));
                } else {
                    dispatch(loginRequired());
                }
            });
    };
}


export function resetPass(payload) {

    return (dispatch, getState) => {

        let { par_id } = getState().user.user.parentId;

        let data = {
            parent_id: 2168,
            user_pwd: payload.cpwd,
            new_password: payload.npwd
        };


        dispatch({type: RESET_PASS});

        console.log('rese', data);

        return axios({
            method: 'put',
            url: 'http://api.eduweb.co.ke/updatePassword',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: data
        })
            // .then(res => console.log('respo', res.data))
            // .catch(err => console.log('erro', err));

        // return Api.post('/updatePassword', data)
        //     .then(rest => console.log('res', rest))
        //     .catch(err => console.log('err', err));
    }

}



export function loginUser(username:string, password:string, deviceId:string):Action {
    return (dispatch, getState) => {
        dispatch(loginRequest());

        const params = {
            user_name: username,
            user_pwd: password,
        };
        return Api.post('/parentLogin', params)
            .then((user) => {
                if (user.parent_id) {
                    const userData = {
                        firstName: user.first_name,
                        middleName: user.middle_name,
                        lastName: user.last_name,
                        email: user.email,
                        fullName: user.parent_full_name,
                        parentId: user.parent_id,
                        deviceId: user.device_user_id,
                    };
                    dispatch(loginSuccess(userData));
                    dispatch(setStudents({ students: user.students }));
                    dispatch(setNews({ news: user.news }));

                    if (user.device_user_id !== deviceId) {
                        dispatch(updateDeviceUserId(user.parent_id, deviceId));
                    }

                    // store user session for future logins
                    store.save('UserSession', userData);
                }      else {
                    dispatch(loginFailed());
                }
            })
            .catch((ex) => {
                dispatch(loginFailed());
            });

        /*
        const hash = base64.encode(`${username}:${password}`)
        return fetch('http://devapi.eduweb.co.ke/parentLogin', {
          headers: {
            'Authorization': `Basic ${hash}`
          }
        })
        .then(response => response.json().then(json => ({ json, response })))
        .then(({json, response}) => {
          if (response.ok === false) {
            return Promise.reject(response, json)
          }
          return json
        })
        .then(
          // success
          data => {
            console.log(data);
            // We pass the `authentication hash` down to the reducer so that it
            // can be used in subsequent API requests.
            // data = { authenticated: true, user: 'admin' }
            let userData = {
              firstName: user.first_name,
              middleName: user.middle_name,
              lastName: user.last_name,
              email: user.email,
              fullName: user.parent_full_name,
              parentId: user.parent_id
            }
            dispatch(loginSuccess(hash, userData))
            dispatch(setStudents({students: user.students}));
            dispatch(setNews({news: user.news}));

            if(user.device_user_id !== deviceId) {
              dispatch(updateDeviceUserId(user.parent_id, deviceId));
            }
          },
          // failure
          (response, data) => dispatch(loginFailure(data.error || 'Log in failed'))
        )
        */
    };
}

export function clearUser():Action {
    return (dispatch, getState) => store
        .delete('UserSession').
        then(() => {
            //dispatch(resetNavigation());
            dispatch(logoutSuccess());
        });
}

function loginSuccess(userData):Action {
    return {
        type: LOGIN_SUCCESS,
        user: userData,
        deviceId: userData.deviceId,
    };
}

function loginFailed():Action {
    return {
        type: LOGIN_FAILED,
    };
}

function logoutSuccess():Action {
    return {
        type: LOGGED_OUT,
    };
}
