
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import user from './user';
import students from './students';
import news from './news';
import blog from './blog';
import fees from './fees';
import grading from './grading';
import school from './school';
import invoice from './invoice';
import payment from './payment';
import notifications from './notifications';

export default combineReducers({
  drawer,
  user,
  students,
  cardNavigation,
  news,
  blog,
  fees,
  grading,
  notifications,
  school,
  invoice,
  payment
});
