
import type { Action } from './types';
import Api from '../lib/api'

export const SET_SCHOOL_DETAILS = 'SET_SCHOOL_DETAILS';

/* schoool details for header */
export function fetchSchoolDetails(school:string):Action {
  return (dispatch, getState) => {
    return Api.get(`/getSchoolContactInfo/${school}`).then(resp => {
      dispatch(setSchoolDetails({school, details: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function setSchoolDetails({school, details}):Action {
  return {
    type: SET_SCHOOL_DETAILS,
    details,
    school
  };
}
