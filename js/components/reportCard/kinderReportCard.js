
import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import styles from './styles';

export default class KinderReportCard extends Component {

  static propTypes = {
    reportData: React.PropTypes.object,
    student: React.PropTypes.object,
  }

  getSubjectStyle(parent) {
    return {
      marginLeft: parent === null  ? 0 : 10,
      fontWeight: parent === null ? 'bold' : 'normal'
    }
  }

  getTextStyle(parent) {
    return {
      fontWeight: parent === null ? 'bold' : 'normal'
    }
  }

  render() {
    const reportData = this.props.reportData;
    const reportCard = JSON.parse(reportData.report_data);
    const student = this.props.student;


    return (
      <View style={styles.reportCardBody}>
        <View style={styles.studentData}>
          <View style={styles.itemData}>
            <Text>
              <Text style={styles.strong}>Name:</Text> {student.student_name}
            </Text>
          </View>
          <View style={styles.itemData}>
            <Text>
              <Text style={styles.strong}>Class:</Text> {reportData.class_name}
            </Text>
            <Text>
              <Text style={styles.strong}>Class Teacher:</Text> {reportData.teacher_name}
            </Text>
          </View>
          <View style={styles.itemData}>
            <Text>
              <Text style={styles.strong}>Term:</Text> {reportData.term_name}
            </Text>
            <Text>
              <Text style={styles.strong}>Year:</Text> {reportData.year}
            </Text>
            <Text>
              <Text style={styles.strong}>Date:</Text> {moment(reportCard.closingDate).format('MMM D, YYYY')}
            </Text>
          </View>
        </View>
        <ScrollView horizontal>
          <TouchableWithoutFeedback>
            <View style={styles.kinderReportCardContents}>
              <View style={styles.tableHeader}>
                <View style={styles.rows}>

                  <View style={[styles.subjectCol,styles.cell]}>
                    <Text style={styles.center}>SUBJECT</Text>
                  </View>


                  <View style={[styles.cell,styles.noRightBorder]}>
                    <Text style={styles.center}>REMARKS</Text>
                  </View>
                </View>
              </View>
              <View style={styles.tableBody}>
              {
                reportCard.subjects.map((item,key) => {
                  return (
                    <View style={styles.rows} key={key}>
                      <View style={[styles.subjectCol,styles.cell]}>
                        <Text style={this.getSubjectStyle(item.parent_subject_name)}>{item.subject_name}</Text>
                      </View>
                      <View style={[styles.cell,styles.noRightBorder]}>
                        <Text>{item.remarks}</Text>
                      </View>
                    </View>
                  )
                })
              }
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View style={styles.reportCardFooter}>
          <View style={styles.rows}>
            <View style={[styles.cell,styles.noRightBorder]}>
              <Text style={styles.heading}>REMARKS</Text>
            </View>
          </View>
          <View style={styles.rows}>
            <View style={[styles.third,styles.cell]}>
              <Text style={styles.strong}>Class Teacher Comments</Text>
              <Text style={styles.comments}>{reportCard.comments.teacher_comments}</Text>
            </View>
            <View style={[styles.cell,styles.noRightBorder]}>
              <Text>{reportCard.comments.head_teacher_name}</Text>
              <Text style={styles.strong}>Sign:</Text>
            </View>
          </View>
          <View style={styles.rows}>
            <View style={[styles.third,styles.cell]}>
              <Text style={styles.strong}>Head Teacher</Text>
              <Text style={styles.comments}>{reportCard.comments.principle_comments}</Text>
            </View>
            <View style={[styles.cell,styles.noRightBorder]}>
              <Text style={styles.strong}>Sign:</Text>
            </View>
          </View>
          <View style={styles.rows}>
            <View style={[styles.cell,styles.noRightBorder]}>
              <Text style={styles.strong}>Next Term Begins:</Text>
              <Text style={styles.comments}>{reportCard.nextTerm}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
