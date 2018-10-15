
import type { Action } from './types';
import Api from '../lib/api'

export const SET_NEWS_INDEX = 'SET_NEWS_INDEX';
export const SET_NEWS = 'SET_NEWS';
export const TRASH_NEWS = 'TRASH_NEWS';
export const STAR_NEWS = 'STAR_NEWS';

export function setNews({ news }):Action {
  return {
    type: SET_NEWS,
    news,
  }
}

export function setNewsIndex(school:string, index:number):Action {
  return {
    type: SET_NEWS_INDEX,
    schoolId: school,
    newsId:index,
  };
}

export function trashNews(school:string, index:number):Action {
  return {
    type: TRASH_NEWS,
    school: school,
    newsId:index,
  };
}

export function starNews(school:string, index:number):Action {
  return {
    type: STAR_NEWS,
    school: school,
    newsId:index,
  };
}
