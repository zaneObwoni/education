var moment = require('moment');
import type { Action } from '../actions/types';
import { SET_NEWS, SET_NEWS_INDEX, TRASH_NEWS, STAR_NEWS } from '../actions/news';

export type State = {
    news: object
}

const icons = {};
icons['General'] = "md-paper";
icons['Reminder'] = "md-notifications";

const initialState = {
  news: {},
  selectedIndex: undefined,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_NEWS_INDEX) {
    return {
      ...state,
      selectedIndex: action.newsId,
      school: action.schoolId
    };
  }
  if (action.type === SET_NEWS) {
    Object.keys(action.news).map((school) => {
      let newsMap = {}
      action.news[school].forEach( (newsItem) => {
        newsItem.creation_date = moment(newsItem.creation_date).format('MMM Do YYYY');
        newsItem.icon = icons[newsItem.com_type];
        newsMap[newsItem.com_id] = newsItem;
      });
      action.news[school] = newsMap;
    });

    return {
      ...state,
      news: action.news,
    };
  }
  if(action.type === TRASH_NEWS) {
    let newState = {...state};
    delete newState.news[action.school][action.newsId];
    return newState;
  }
  return state;
}
