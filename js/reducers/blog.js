
import type { Action } from '../actions/types';
import {
  SET_STUDENT_BLOG,
  SET_STUDENT_HOMEWORK
} from '../actions/blog';

export type State = {
    posts: array,
    homework: array
}

const initialState = {
  posts: [],
  homework: []
};

export default function (state:State = initialState, action:Action): State {
  if (action.type == SET_STUDENT_BLOG) {
    return {
      ...state,
      blogPosts: action.posts,
      blogPagination: action.pagination
    }
  }
  if (action.type == SET_STUDENT_HOMEWORK) {
    return {
      ...state,
      homeworkPosts: action.homework
    }
  }
  return state;
}
