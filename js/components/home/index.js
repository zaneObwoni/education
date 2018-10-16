
import React, { Component } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Content, Text, Icon, Spinner } from 'native-base';

import PageHeader from '../common/header';
import styles from './styles';

export default class Home extends Component {

  static propTypes = {
    students: React.PropTypes.object,
    news: React.PropTypes.object,
    setStudentIndex: React.PropTypes.func,
    setStudentSchool: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  loadStudent(route, index, school) {
    this.props.setStudentIndex(index);
    this.props.setStudentSchool(school);
    this.pushRoute(route);
  }

  loadNewsItem(route, school, index) {
    this.props.setNewsIndex(school, index);
    this.pushRoute(route);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  students() {
    return Object.keys(this.props.students).map(key => this.props.students[key])
  }

  schools() {
    return Object.keys(this.props.news);
  }

  news(school) {
    return Object.keys(this.props.news[school]).map(key => this.props.news[school][key])
  }

  render() {
    return (
      <View style={styles.container}>
        <PageHeader
          title='Home'
          menuBtn={true}
          menuBtnOnPress={this.props.openDrawer} />

        { this.props.isFetching
          ? <Content>
              <Spinner color='green' />
            </Content>
          : <Content>
              <View style={styles.boxContainer}>
                { this.students().map((student) => {
                  return <View
                    key={student.student_id}
                    style={styles.box}>
                    <TouchableOpacity
                      onPress={() => this.loadStudent('studentMain', student.student_id, student.school)}>
                      {
                        student.student_image
                        ? <Image style={styles.picContainer} source={{uri: `http://${student.school}.eduweb.co.ke/assets/students/${student.student_image}`}} />
                        : <Icon style={styles.studentIcon} name="md-happy" color="#000" />
                      }
                      <Text style={styles.name}>{student.student_name}</Text>
                      <Text style={styles.note}>{student.class_name}</Text>
                      <Text style={styles.note}>{student.school_name}</Text>
                    </TouchableOpacity>
                  </View>
                })}
              </View>

              <View style={styles.newsContainer}>
                <Text style={styles.heading}>News</Text>

                { this.schools().map((school) => {
                  return (
                    <View key={school}>
                      <Text style={styles.schoolHeading}>{school.toUpperCase()}</Text>
                      {
                        this.news(school).length > 0
                        ?  this.news(school).map((newsItem) => {
                          return (
                            <TouchableOpacity
                              key={newsItem.com_id}
                              style={styles.itemContainer}
                              onPress={() => this.loadNewsItem('news', school, newsItem.com_id)}>
                                <Icon style={styles.newsIcon} name={newsItem.icon || 'md-notifications'} size={50} />
                                <View style={styles.news}>
                                  <Text style={styles.subject}>{newsItem.subject}</Text>
                                  <Text style={styles.newsNote}>
                                    {newsItem.creation_date} {newsItem.posted_by}
                                    {
                                      newsItem.trashed ? 'Deleted' : ''
                                    }
                                  </Text>
                                </View>
                            </TouchableOpacity>
                          )
                        }).reverse()
                        : <Text style={styles.newsNote}>No new news from this school.</Text>
                      }
                    </View>
                  )
                })}
              </View>
            </Content>
        }
      </View>
    );
  }
}
