
import type { Action } from '../actions/types';
import {
  SET_STUDENT_REPORT_CARDS,
  SET_STUDENT_CLASSES,
  SET_STUDENT_TERMS,
  SET_STUDENT_EXAMS,
  SET_REPORT_CARD_INDEX,
  SET_EXAM_TYPES,
  SET_REPORT_DOWNLOAD,
  SET_CURRENT_TERM
} from '../actions/grading';

export type State = {
    reportCards: array,
    classes: array,
    terms: array,
    exams: object,
    reportData: object,
    examTypes: array
}

const initialState = {
  reportCards: [],
  classes: [],
  terms: [],
  exams: {},
  reportData: {},
  examTypes: []
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_STUDENT_REPORT_CARDS) {
    return {
      ...state,
      reportCards: action.reportCards,
    };
  }
  if (action.type === SET_REPORT_CARD_INDEX) {
    const reportCardData = JSON.parse(action.reportData.report_data);

    let examTypes = [];
    if (reportCardData.subjects && reportCardData.subjects[0].marks) {
      reportCardData.subjects.map((item) => {
        Object.keys(item.marks).map((examType) => {
          if( examTypes.indexOf(examType) === -1 ) examTypes.push(examType);
        });
      });
    }

    return {
      ...state,
      reportData: action.reportData,
      examTypes,
    };
  }
  if (action.type == SET_STUDENT_CLASSES) {
    return {
      ...state,
      classes: action.classes
    };
  }
  if (action.type === SET_STUDENT_TERMS) {
    return {
      ...state,
      terms: action.terms,
    };
  }
  if (action.type == SET_STUDENT_EXAMS) {
    // group by exam type
    let examResults = {};
    if (action.exams) {
      action.exams.map( item => {
        if( !examResults[item.exam_type] ) examResults[item.exam_type] = [];
        examResults[item.exam_type].push(item);
      });
    }

    return {
      ...state,
      exams: examResults
    }
  }
  if (action.type == SET_EXAM_TYPES) {
    return {
      ...state,
      examTypes: action.examTypes
    }
  }
  if (action.type === SET_REPORT_DOWNLOAD) {
    return {
      ...state,
      html: action.html
    }
  }
  if (action.type === SET_CURRENT_TERM) {
    return {
      ...state,
      currentTerm: action.currentTerm
    }
  }
  return state;
}
