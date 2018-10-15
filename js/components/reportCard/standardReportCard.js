
import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import _ from 'lodash';

import styles from './styles';

export default class StandardReportCard extends Component {

    static propTypes = {
        reportData: React.PropTypes.object,
        student: React.PropTypes.object,
        comments: React.PropTypes.object,
        examTypes: React.PropTypes.array,
        students: React.PropTypes.object,
    };

    getSubjectStyle(parent) {
        return {
            marginLeft: parent === null  ? 0 : 20,
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
        const { student, comments } = this.props;
        const examTypes = this.props.examTypes;

        console.log('comm', reportCard);

        return (
            <View style={styles.reportCardBody}>
                <View style={styles.studentData}>
                    <View style={styles.itemData}>
                        <Text>
                            <Text style={styles.strong}>Name:</Text> {student.student_name}
                        </Text>
                        <Text>
                            <Text style={styles.strong}>Adm No.:</Text> {student.admission_number}
                        </Text>
                    </View>
                    <View style={styles.itemData}>
                        <Text>
                            <Text style={styles.strong}>Class:</Text> {reportData.class_name}
                        </Text>
                        <Text>
                            <Text style={styles.strong}>Term:</Text> {reportData.term_name}
                        </Text>
                        <Text>
                            <Text style={styles.strong}>Year:</Text> {reportData.year}
                        </Text>
                    </View>

                    {
                        student.school === 'lasalle' && student.class_cat_id === 5 ||
                        student.class_cat_id === 6 ||
                        student.class_cat_id === 7 ||
                        student.class_cat_id === 8 ||
                        student.class_cat_id === 9 ||
                        student.class_cat_id === 21
                            ?
                            null
                            :
                            <View style={styles.itemData}>
                                <Text>
                                    <Text style={styles.strong}>Position:</Text> {reportCard.position.rank}/{reportCard.position.position_out_of}
                                </Text>
                                <Text>
                                    <Text style={styles.strong}>Pos Last Term:</Text>
                                    {reportCard.position_last_term ? reportCard.position_last_term.rank : '-'}/
                                    {reportCard.position_last_term ? reportCard.position_last_term.position_out_of : '-'}
                                </Text>
                                <Text>
                                    <Text style={styles.strong}>Last Term Marks:</Text>
                                    {reportCard.position_last_term ? reportCard.position_last_term.total_mark : '-'}/
                                    {reportCard.position_last_term ? reportCard.position_last_term.total_grade_weight : '-'}
                                </Text>
                            </View>
                    }



                </View>
                <ScrollView horizontal>
                    <TouchableWithoutFeedback>
                        <View style={styles.reportCardContents}>
                            <View style={styles.tableHeader}>
                                <View style={styles.rows}>

                                    {
                                        student.school === 'lasalle' && student.class_cat_id === 5 ||
                                        student.class_cat_id === 6 ||
                                        student.class_cat_id === 7 ||
                                        student.class_cat_id === 8 ||
                                        student.class_cat_id === 9 ||
                                        student.class_cat_id === 21
                                            ? <View style={[styles.subjectCol,styles.cell]}>
                                                <Text style={styles.center}>LEARNING AREA</Text>
                                            </View>
                                            : <View style={[styles.subjectCol,styles.cell]}>
                                                <Text style={styles.center}>SUBJECT</Text>
                                            </View>

                                    }

                                    <View style={styles.quarter}>
                                        <View style={styles.columns}>
                                            <View style={styles.cell}>
                                                <Text style={styles.center}>MARKS</Text>
                                            </View>
                                            <View style={styles.rows}>
                                                {
                                                    examTypes.map((exam,key) => {
                                                        return (
                                                            <View style={styles.columns} key={key}>
                                                                <View style={styles.cell}>
                                                                    <Text style={styles.center}>{exam.toUpperCase()}</Text>
                                                                </View>
                                                                <View style={styles.rows}>
                                                                    <View style={styles.cell}>
                                                                        <Text style={styles.center}>Mark</Text>
                                                                    </View>

                                                                    {
                                                                        student.school === 'lasalle' && student.class_cat_id === 5 ||
                                                                        student.class_cat_id === 6 ||
                                                                        student.class_cat_id === 7 ||
                                                                        student.class_cat_id === 8 ||
                                                                        student.class_cat_id === 9 ||
                                                                        student.class_cat_id === 21
                                                                            ? null
                                                                            : <View style={styles.cell}>
                                                                                <Text style={styles.center}>Out Of</Text>
                                                                            </View>
                                                                    }


                                                                    <View style={styles.cell}>
                                                                        <Text style={styles.center}>Grade</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                    </View>

                                    {
                                        student.school === 'lasalle' && student.class_cat_id === 5 ||
                                        student.class_cat_id === 6 ||
                                        student.class_cat_id === 7 ||
                                        student.class_cat_id === 8 ||
                                        student.class_cat_id === 9 ||
                                        student.class_cat_id === 21
                                            ?
                                            null
                                            :
                                            <View style={styles.single}>
                                                <View style={styles.columns}>
                                                    <View style={styles.cell}>
                                                        <Text style={styles.center}>Overall</Text>
                                                    </View>
                                                    <View style={styles.rows}>
                                                        <View style={styles.cell}>
                                                            <Text style={styles.center}>Avg</Text>
                                                        </View>
                                                        <View style={styles.cell}>
                                                            <Text style={styles.center}>Grade</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                    }


                                    {
                                        student.school === 'lasalle' && student.class_cat_id === 5 ||
                                        student.class_cat_id === 6 ||
                                        student.class_cat_id === 7 ||
                                        student.class_cat_id === 8 ||
                                        student.class_cat_id === 9 ||
                                        student.class_cat_id === 21
                                            ?
                                            <View style={[styles.half,styles.cell]}>
                                                <Text style={styles.center}>
                                                    TEACHERS COMMENTS ON PERFORMANCE OF CURRICULUM OUTCOME
                                                </Text>
                                            </View>
                                            :
                                            <View style={[styles.half,styles.cell]}>
                                                <Text style={styles.center}>Remarks</Text>
                                            </View>
                                    }


                                    {
                                        student.school === 'lasalle' && student.class_cat_id === 5 ||
                                        student.class_cat_id === 6 ||
                                        student.class_cat_id === 7 ||
                                        student.class_cat_id === 8 ||
                                        student.class_cat_id === 9 ||
                                        student.class_cat_id === 21
                                            ? null
                                            : <View style={[styles.single,styles.cell,styles.noRightBorder]}>
                                                <Text style={styles.center}>Teacher Initials</Text>
                                            </View>
                                    }

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
                                                <View style={styles.quarter}>
                                                    <View style={styles.rows}>
                                                        { examTypes.map((exam,examKey) => {
                                                            return (
                                                                <View style={styles.rows} key={examKey}>
                                                                    <View style={styles.cell}>
                                                                        <Text style={[this.getTextStyle(item.parent_subject_name),styles.center]}>
                                                                            {item.marks[exam] ? item.marks[exam].mark : ''}
                                                                        </Text>
                                                                    </View>

                                                                    {
                                                                        student.class_cat_id === 7
                                                                            ? null
                                                                            : <View style={styles.cell}>
                                                                                <Text style={[this.getTextStyle(item.parent_subject_name),styles.center]}>
                                                                                    {item.marks[exam] ? item.marks[exam].grade_weight : '' }
                                                                                </Text>
                                                                            </View>
                                                                    }

                                                                    <View style={styles.cell}>
                                                                        <Text style={[this.getTextStyle(item.parent_subject_name),styles.center]}>
                                                                            {item.marks[exam] ? item.marks[exam].grade : ''}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            )
                                                        })}
                                                    </View>
                                                </View>

                                                {
                                                    student.school === 'lasalle' && student.class_cat_id === 5 ||
                                                    student.class_cat_id === 6 ||
                                                    student.class_cat_id === 7 ||
                                                    student.class_cat_id === 8 ||
                                                    student.class_cat_id === 9 ||
                                                    student.class_cat_id === 21
                                                        ?
                                                        null
                                                        :
                                                        <View style={styles.single}>
                                                            <View style={styles.rows}>
                                                                <View style={styles.cell}>
                                                                    { item.parent_subject_name == null
                                                                        ? <Text style={styles.center}>{item.overall_mark}%</Text>
                                                                        :  null
                                                                    }
                                                                </View>
                                                                <View style={styles.cell}>
                                                                    { item.parent_subject_name == null
                                                                        ? <Text style={styles.center}>{item.overall_grade}</Text>
                                                                        :  null
                                                                    }
                                                                </View>
                                                            </View>
                                                        </View>
                                                }

                                                <View style={[styles.half,styles.cell]}>
                                                    <Text>{item.remarks}</Text>
                                                </View>

                                                {
                                                    student.school === 'lasalle' && student.class_cat_id === 5 ||
                                                    student.class_cat_id === 6 ||
                                                    student.class_cat_id === 7 ||
                                                    student.class_cat_id === 8 ||
                                                    student.class_cat_id === 9 ||
                                                    student.class_cat_id === 21
                                                        ? null
                                                        :<View style={[styles.single,styles.cell,styles.noRightBorder]}>
                                                            <Text>{item.initials}</Text>
                                                        </View>
                                                }

                                            </View>
                                        )
                                    })
                                }
                            </View>

                            {
                                student.school === 'lasalle' && student.class_cat_id === 5 ||
                                student.class_cat_id === 6 ||
                                student.class_cat_id === 7 ||
                                student.class_cat_id === 8 ||
                                student.class_cat_id === 9 ||
                                student.class_cat_id === 21
                                    ?
                                    null
                                    :
                                    <View style={styles.tableFooter}>
                                        <View style={styles.rows}>
                                            <View style={[styles.subjectCol,styles.cell]}>
                                                <Text style={styles.strong}>TOTAL</Text>
                                            </View>
                                            <View style={styles.quarter}>
                                                <View style={styles.rows}>
                                                    { examTypes.map((exam,examKey) => {
                                                        return (
                                                            <View style={styles.rows} key={examKey}>
                                                                <View style={styles.cell}>
                                                                    <Text style={[styles.strong,styles.center]}>
                                                                        {reportCard.totals[exam] ? reportCard.totals[exam].total_mark : ''}
                                                                    </Text>
                                                                </View>
                                                                <View style={styles.cell}>
                                                                    <Text style={[styles.strong,styles.center]}>
                                                                        {reportCard.totals[exam] ? reportCard.totals[exam].total_grade_weight : ''}
                                                                    </Text>
                                                                </View>
                                                                <View style={styles.cell}>
                                                                    <Text style={[styles.strong,styles.center]}>
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                            </View>


                                            <View style={styles.single}>
                                                <View style={styles.rows}>
                                                    <View style={styles.cell}>
                                                        <Text style={[styles.strong,styles.center]}>{reportCard.position.percentage}%</Text>
                                                    </View>
                                                    <View style={styles.cell}>
                                                        <Text style={[styles.strong,styles.center]}>{reportCard.position.grade}</Text>
                                                    </View>
                                                </View>
                                            </View>


                                            <View style={[styles.half,styles.cell]}>
                                                <Text></Text>
                                            </View>
                                            <View style={[styles.single,styles.cell,styles.noRightBorder]}>
                                                <Text></Text>
                                            </View>
                                        </View>
                                    </View>
                            }

                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>

                {
                    student.school === 'lasalle' && student.class_cat_id === 5 ||
                    student.class_cat_id === 6 ||
                    student.class_cat_id === 7 ||
                    student.class_cat_id === 8 ||
                    student.class_cat_id === 9 ||
                    student.class_cat_id === 21
                        ?
                        <View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                                <View>
                                    <View>
                                        <Text>EE: Exceeds Expectation</Text>
                                    </View>
                                    <View>
                                        <Text>MEE: Meets Expectation</Text>
                                    </View>
                                    <View>
                                        <Text>A.E: Approaching Expectation</Text>
                                    </View>
                                    <View>
                                        <Text>N.S: Needs Support</Text>
                                    </View>
                                </View>
                                <View>
                                    <View>
                                        <Text>A: 80 - 100</Text>
                                    </View>
                                    <View>
                                        <Text>B: 65 - 79</Text>
                                    </View>
                                    <View>
                                        <Text>C: 50 - 64</Text>
                                    </View>
                                    <View>
                                        <Text>D: 0 - 49</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{marginTop: 10}}>

                                <Text>SOCIAL/BEHAVIORAL REPORT</Text>

                                <View style={{marginTop: 8}}>
                                    <Text>KEY: S - Satisfactory</Text>
                                    <Text>IN-Improvement needed</Text>
                                </View>

                            </View>

                        </View>
                        :
                        null
                }

                {
                    student.school === 'lasalle' && student.class_cat_id === 5 ||
                    student.class_cat_id === 6 ||
                    student.class_cat_id === 7 ||
                    student.class_cat_id === 8 ||
                    student.class_cat_id === 9 ||
                    student.class_cat_id === 21
                        ?
                        <View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                paddingTop: 5,
                                borderWidth:1,
                                borderColor:'#bbb',
                                justifyContent:'center',
                                marginTop: 8
                            }}>
                                <View style={styles.cell}>
                                    <Text>VALUE/SKILL</Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>COMMENT</Text>
                                </View>
                            </View>


                            <View style={styles.rows}>
                                <View style={styles.cell}>
                                    <Text>
                                        Consideration for others
                                    </Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>
                                        {reportCard.comments.consideration}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.rows}>
                                <View style={styles.cell}>
                                    <Text>
                                        Respect for school property
                                    </Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>
                                        {reportCard.comments.respect}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.rows}>
                                <View style={styles.cell}>
                                    <Text>
                                        Organization
                                    </Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>
                                        {reportCard.comments.organization}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.rows}>
                                <View style={styles.cell}>
                                    <Text>
                                        Accepts Responsibility
                                    </Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>
                                        {reportCard.comments.responsibility}
                                    </Text>
                                </View>
                            </View>


                            <View style={styles.rows}>
                                <View style={styles.cell}>
                                    <Text>
                                        Works Independently
                                    </Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>
                                        {reportCard.comments.independence}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.rows}>
                                <View style={styles.cell}>
                                    <Text>
                                        Works well with others
                                    </Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>
                                        {reportCard.comments.work_others}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.rows}>
                                <View style={styles.cell}>
                                    <Text>
                                        Completes assignments at school
                                    </Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>
                                        {reportCard.comments.assignments}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.rows}>
                                <View style={styles.cell}>
                                    <Text>
                                        Completes assigned homework and projects
                                    </Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>
                                        {reportCard.comments.homework}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.rows}>
                                <View style={styles.cell}>
                                    <Text>
                                        Participates in community service learning
                                    </Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>
                                        {reportCard.comments.community}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.rows}>
                                <View style={styles.cell}>
                                    <Text>
                                        Uses time wisely
                                    </Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>
                                        {reportCard.comments.time_management}
                                    </Text>
                                </View>
                            </View>


                        </View>
                        :
                        null
                }

                {
                    student.school === 'lasalle' && student.class_cat_id === 5 ||
                    student.class_cat_id === 6 ||
                    student.class_cat_id === 7 ||
                    student.class_cat_id === 8 ||
                    student.class_cat_id === 9 ||
                    student.class_cat_id === 21
                        ?
                        <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Teacher's Name: </Text>
                            <Text>{reportCard.comments.teacher_name}</Text>
                        </View>
                        :
                        null
                }


                {
                    student.school === 'lasalle' && student.class_cat_id === 5 ||
                    student.class_cat_id === 6 ||
                    student.class_cat_id === 7 ||
                    student.class_cat_id === 8 ||
                    student.class_cat_id === 9 ||
                    student.class_cat_id === 21
                        ? null
                        :
                        <View style={styles.reportCardFooter}>
                            <View style={styles.rows}>
                                <View style={[styles.cell,styles.noRightBorder]}>
                                    <Text style={styles.heading}>REMARKS</Text>
                                    <Text style={styles.strong}>Extra Curricular Activites</Text>
                                    <Text style={styles.comments}>{reportCard.comments.non_exam_comments}</Text>
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
                                    <Text style={styles.strong}>Head Teacher Comments</Text>
                                    <Text style={styles.comments}>{reportCard.comments.principle_comments}</Text>
                                </View>
                                <View style={[styles.cell,styles.noRightBorder]}>
                                    <Text style={styles.strong}>Sign:</Text>
                                </View>
                            </View>
                            <View style={styles.rows}>
                                <View style={[styles.third,styles.cell]}>
                                    <Text style={styles.strong}>Closing Date</Text>
                                    <Text style={styles.comments}>{reportCard.closingDate}</Text>
                                </View>
                                <View style={[styles.cell,styles.noRightBorder]}>
                                    <Text style={styles.strong}>Next Term Begins:</Text>
                                    <Text style={styles.comments}>{reportCard.nextTerm}</Text>
                                </View>
                            </View>
                        </View>
                }

            </View>
        );
    }
}
