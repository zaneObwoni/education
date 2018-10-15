
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import { fetchStudentBlog, fetchStudentHomework } from '../../../actions/blog';
import StudentBlog from '../../../components/student/blog/';

const {
  popRoute,
  pushRoute
} = actions;

class StudentBlogContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    // TO DO: this will only need to run if data is stale
    this.props.fetchStudentBlog(this.props.school, this.props.studentId, 1).then( (res) => {
      this.props.fetchStudentHomework(this.props.school, this.props.studentId).then( (res) => {
        this.setState({loading: false });
      });
    });
  }

  render() {
    return (
      <StudentBlog {...this.props}
        isLoading={this.state.loading} />
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    //fetchAllStudentBlogData: (school,index) => dispatch(fetchAllStudentBlogData(school,index)),
    fetchStudentBlog: (school,index,page) => dispatch(fetchStudentBlog(school,index,page)),
    fetchStudentHomework: (school,index) => dispatch(fetchStudentHomework(school,index)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  studentId: state.students.selectedIndex,
  school: state.students.selectedSchool,
  students: state.students.students,
  blogPosts: state.blog.blogPosts,
  blogPagination: state.blog.blogPagination,
  homeworkPosts: state.blog.homeworkPosts,
});

export default connect(mapStateToProps, bindAction)(StudentBlogContainer);
