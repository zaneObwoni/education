
import type { Action } from '../actions/types';
import {
  SET_STUDENTS,
  SET_STUDENT_INDEX,
  SET_STUDENT_SCHOOL,
  SET_STUDENT_DETAILS,
  FETCHING_STUDENTS
} from '../actions/students';

export type State = {
    students: obect,
    selectedIndex: number,
    selectedSchool: number,
    isFetching: bool,
    studentDetails: object,
}

const initialState = {
  students: {},
  selectedIndex: undefined,
  isFetching: false,
  selectedSchool: undefined,
  studentDetails: {}
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === FETCHING_STUDENTS) {
    return {
      ...state,
      isFetching:true,
    }
  }
  if (action.type === SET_STUDENT_INDEX) {
    return {
      ...state,
      selectedIndex: action.studentId,
    };
  }
  if (action.type === SET_STUDENT_SCHOOL) {
    return {
      ...state,
      selectedSchool: action.school
    };
  }
  if (action.type === SET_STUDENTS) {
    return {
      ...state,
      isFetching:false,
      students: action.students,
    };
  }
  if (action.type === SET_STUDENT_DETAILS) {
    return {
      ...state,
      studentDetails: action.details
    }
  }
  return state;
}
