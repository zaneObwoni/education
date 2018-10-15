
import type { Action } from './types';
import Api from '../lib/api';
import { setNews } from './news';

export const SET_STUDENTS = 'SET_STUDENTS';
export const SET_STUDENT_INDEX = 'SET_STUDENT_INDEX';
export const SET_STUDENT_SCHOOL = 'SET_STUDENT_SCHOOL';
export const SET_STUDENT_DETAILS = 'SET_STUDENT_DETAILS';
export const SET_STUDENT_BLOG = 'SET_STUDENT_BLOG';
export const SET_STUDENT_HOMEWORK = 'SET_STUDENT_HOMEWORK';
export const FETCHING_STUDENTS = 'FETCHING_STUDENTS';

function fetchingStudents() {
  return {
    type: FETCHING_STUDENTS,
  };
}

export function fetchStudents(parentId:number):Action {
  return (dispatch, getState) => {
    dispatch(fetchingStudents());
    return Api.get(`/getParentStudents/${parentId}`).then((resp) => {
      console.log(resp);
      dispatch(setStudents({ students: resp.students }));
      dispatch(setNews({ news: resp.news }));
    }).catch((ex) => {
      console.log(ex);
    });
  };
}

export function setStudents({ students }):Action {
  const studentsMap = {};
  students.forEach((student) => {
    studentsMap[student.student_id] = student;
  });
  return {
    type: SET_STUDENTS,
    students: studentsMap,
  };
}

export function setStudentIndex(index:number):Action {
  return {
    type: SET_STUDENT_INDEX,
    studentId: index,
  };
}

export function setStudentSchool(school:string):Action {
  return {
    type: SET_STUDENT_SCHOOL,
    school,
  };
}

/* student details */
export function fetchStudentDetails(school:string, studentId:number):Action {
  return (dispatch, getState) => Api.get(`/getStudent/${school}/${studentId}`).then(resp => {
      dispatch(setStudentDetails({details: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
}

export function setStudentDetails({ details }):Action {
  // concate names for ease of use
  details.student_name = `${details.first_name  } ${  details.middle_name  } ${  details.last_name}`;
  return {
    type: SET_STUDENT_DETAILS,
    details,
  };
}
