import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Content, Spinner} from 'native-base';
import styles from './styles';

export default class ExamsTab extends Component {
  static propTypes = {
    exams: React.PropTypes.object,
    fetchStudentExams: React.PropTypes.func,
    fetchAllGradingData: React.PropTypes.func,
    fetchCurrentTerm: React.PropTypes.func,
    studentId: React.PropTypes.number,
    students: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectsLoading: true,
      currentClass:{},
      currentTerm:{},
      student: isNaN(this.props.studentId) ? undefined : this.props.students[this.props.studentId]
    }
  }

  componentWillMount() {
    // TO DO: this will only need to run if data is stale
    const classId = this.state.student.class_id;

    this.props.fetchCurrentTerm(this.props.school).then( (res) => {
      if (this.props.currentTerm && this.props.currentTerm.term_id) {
        // fetch current class, current term exam marks if set
        this.fetchExamMarks(classId, this.props.currentTerm.term_id);
      }
    });

    this.props.fetchAllGradingData(this.props.school, this.props.studentId).then( (res) => {
        this.setState({selectsLoading: false });
    });
  }



  fetchExamMarks(classId, termId) {
    this.props.fetchStudentExams(this.props.school, this.props.studentId, classId, termId).then( (res) => {
      // store what exam mark criteria was used
      this.setState({
        currentTerm: this.props.currentTerm,
        currentClass: {
          class_id: classId,
          class_name: this.state.student.class_name
        },
        loading: false
      });
    });
  }

  examTypes() {
    return Object.keys(this.props.exams);
  }

  exams(examType) {
    return Object.keys(this.props.exams[examType]).map(key => this.props.exams[examType][key])
  }

  getSubjectStyle(parent) {
    return {
      marginLeft: parent === null  ? 0 : 20,
      fontWeight: parent === null ? 'bold' : 'normal'
    }
  }

  render() {
    const examMarks = this.props.exams;

    return (
      <Container>
        <Content padder>
        { this.state.loading
          ? <View><Spinner color='green' /></View>
          : this.examTypes().length > 0
            ? this.examTypes().map((examType) => {
                return (
                  <View key={examType}>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemHeader}>
                        <Text style={[styles.itemTitle, styles.sectionTitle]}>
                          {this.state.currentClass.class_name.toUpperCase()} {this.state.currentTerm.term_name}
                        </Text>
                        <Text style={styles.itemValue}>
                          <Text style={styles.strong}>{examType.toUpperCase()}</Text>
                        </Text>
                      </View>
                    </View>
                    { this.exams(examType).length > 0
                      ? this.exams(examType).map((item,key) => {
                          return (
                            <View style={styles.itemContainer} key={key}>
                              <View style={styles.itemHeader}>
                                <Text style={[this.getSubjectStyle(item.parent_subject_name),styles.itemTitle]}>
                                  {item.subject_name}
                                </Text>
                                <Text style={styles.itemValue}>
                                  <Text style={styles.strong}>{item.mark}</Text>/{item.grade_weight}
                                </Text>
                              </View>
                            </View>
                          )
                        })
                      : null
                    }
                  </View>
                )
              })
            : <View>
    	          <Text style={styles.note}>No exam marks found.</Text>
    	        </View>

        }
        </Content>
      </Container>
    )
  }
}
