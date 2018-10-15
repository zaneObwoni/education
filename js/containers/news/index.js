
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import News from '../../components/news/';
import { trashNews, starNews } from '../../actions/news';
import { openDrawer } from '../../actions/drawer';

const {
  popRoute,
} = actions;

class NewsContainer extends Component {

  render() {
    return (
      <News {...this.props} />
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    trashNews: (school, index) => dispatch(trashNews(school,index)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  newsId: state.news.selectedIndex,
  school: state.news.school,
  news: state.news.news,
});


export default connect(mapStateToProps, bindAction)(NewsContainer);
