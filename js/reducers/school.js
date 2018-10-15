import type { Action } from '../actions/types';
import { SET_SCHOOL_DETAILS } from '../actions/school';

export type State = {
    details: object
}

const initialState = {
  details: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_SCHOOL_DETAILS) {
    let schoolDetails = {};
    schoolDetails[action.school] = action.details.reduce((total, current) => {
      total[current.name] = current.value;
      return total;
    }, {});

    return {
      ...state,
      schoolDetails
    };
  }
  return state;
}
