
import type { Action } from './types';
import Api from '../lib/api'

export const SET_STUDENT_REPORT_CARDS = 'SET_STUDENT_REPORT_CARDS';
export const SET_STUDENT_CLASSES = 'SET_STUDENT_CLASSES';
export const SET_STUDENT_TERMS = 'SET_STUDENT_TERMS';
export const SET_STUDENT_EXAMS = 'SET_STUDENT_EXAMS';
export const SET_REPORT_CARD_INDEX = 'SET_REPORT_CARD_INDEX';
export const SET_EXAM_TYPES = 'SET_EXAM_TYPES';
export const SET_REPORT_DOWNLOAD = 'SET_REPORT_DOWNLOAD';
export const SET_CURRENT_TERM = 'SET_CURRENT_TERM';

export function fetchAllGradingData(school:string, studentId:number):Action {
  return (dispatch, getState) => Promise.all([
    dispatch(fetchStudentClasses(school, studentId)),
    dispatch(fetchStudentTerms(school)),
  ]);
}

/* fetch classes */
export function fetchStudentClasses(school:string, studentId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getStudentClasses/${school}/${studentId}`).then(resp => {
      dispatch(setClasses({classes: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

function setClasses({ classes }):Action {
  return {
    type: SET_STUDENT_CLASSES,
    classes
  }
}

/* fetch terms */
export function fetchStudentTerms(school:string):Action {
  return (dispatch, getState) => {
    let year = new Date().getFullYear();
    return Api.get(`/getTerms/${school}/${year}`).then(resp => {
      dispatch(setTerms({terms: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

function setTerms({ terms }):Action {
  return {
    type: SET_STUDENT_TERMS,
    terms
  }
}

/* fetch report cards */
export function fetchStudentReportCards(school:string, studentId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getStudentReportCards/${school}/${studentId}`).then(resp => {
      dispatch(setReportCards({reportCards: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

function setReportCards({ reportCards }):Action {
  return {
    type: SET_STUDENT_REPORT_CARDS,
    reportCards
  }
}

export function setReportIndex(reportData:object):Action {
  return {
    type: SET_REPORT_CARD_INDEX,
    reportData,
  };
}

/* fetch exam types */
export function fetchExamTypes(school:string, classCatId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getExamTypes/${school}/${classCatId}`).then(resp => {
      dispatch(setExamTypes({examTypes: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

function setExamTypes({ terms }):Action {
  return {
    type: SET_EXAM_TYPES,
    terms
  }
}

/* report download */
export function downloadReport(html:string):Action {
  return {
    type: SET_REPORT_DOWNLOAD,
    html: html
  };
}

/* fetch exams */
export function fetchStudentExams(school:string, studentId:number, classId:number, termId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getStudentExamMarksPortal/${school}/${studentId}/${classId}/${termId}`).then(resp => {
      dispatch(setExams({exams: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

function setExams({ exams }):Action {
  return {
    type: SET_STUDENT_EXAMS,
    exams
  }
}

/* fetch curren term */
export function fetchCurrentTerm(school:string):Action {
  return (dispatch, getState) => {
    return Api.get(`/getCurrentTerm/${school}`).then(resp => {
      dispatch(setCurrentTerm({currentTerm: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

function setCurrentTerm({ currentTerm }):Action {
  return {
    type: SET_CURRENT_TERM,
    currentTerm
  }
}
