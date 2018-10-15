
import type { Action } from './types';
import Api from '../lib/api';

export const SET_STUDENT_BLOG = 'SET_STUDENT_BLOG';
export const SET_STUDENT_HOMEWORK = 'SET_STUDENT_HOMEWORK';


export function fetchAllStudentBlogData(school:string, studentId:number):Action {
  return (dispatch, getState) => Promise.all([
    dispatch(fetchStudentBlog(school, studentId, 1)),
    dispatch(fetchStudentHomework(school, studentId))
  ]);
}

/* student blog posts */
export function fetchStudentBlog(school:string, studentId:number, pageNumber:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getBlog/${school}/${studentId}/${pageNumber}`).then(resp => {
      dispatch(setStudentBlog(resp));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function setStudentBlog(blogData):Action {
  return {
    type: SET_STUDENT_BLOG,
    posts: blogData.posts,
    pagination: blogData.pagination
  }
}

/* student homework */
export function fetchStudentHomework(school:string, studentId:number):Action {
  return (dispatch, getState) => {
    return Api.get(`/getHomework/${school}/${studentId}`).then(resp => {
      dispatch(setStudentHomework({homework: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function setStudentHomework({ homework }):Action {
  return {
    type: SET_STUDENT_HOMEWORK,
    homework,
  }
}
