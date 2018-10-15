
import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Spinner } from 'native-base';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import PageHeader from '../../common/header';
import StudentHeader from '../../common/studentHeader';
import styles from '../styles';
import PostsTab from './postsTab';
import HomeworkTab from './homeworkTab';


const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
export default class StudentBlog extends Component {

  static propTypes = {
    isLoading: React.PropTypes.bool,
    studentId: React.PropTypes.number,
    students: React.PropTypes.object,
    blogPosts: React.PropTypes.array,
    blogPagination: React.PropTypes.object,
    homeworkPosts: React.PropTypes.array,
    fetchStudentBlog: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    const student = isNaN(this.props.studentId) ? undefined : this.props.students[this.props.studentId];

    return (
      <View style={styles.container}>
        <PageHeader
          title="Blog"
          backBtn
          hasTabs
          backBtnOnPress={() => this.popRoute()}
        />

        <StudentHeader student={student} />

        { this.props.isLoading
            ? <View><Spinner color="green" /></View>
            : <ScrollableTabView
              tabBarBackgroundColor={'#333'}
              tabBarActiveTextColor={'#fff'}
              tabBarInactiveTextColor={'#fff'}
              tabBarUnderlineStyle={{ backgroundColor: '#fff' }}
              tabBarTextStyle={{ fontFamily, fontSize: 15, lineHeight: 30 }}
            >
              <PostsTab
                tabLabel="Posts"
                school={this.props.school}
                studentId={this.props.studentId}
                fetchStudentBlog={this.props.fetchStudentBlog}
                posts={this.props.blogPosts}
                pagination={this.props.blogPagination}
              />
              <HomeworkTab
                tabLabel="Homework"
                school={this.props.school}
                studentId={this.props.studentId}
                homework={this.props.homeworkPosts}
              />
            </ScrollableTabView>
          }

      </View>
    );
  }
}
