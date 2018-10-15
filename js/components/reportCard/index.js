
import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Spinner} from 'native-base';

import PageHeader from '../common/header';
import StandardReportCard from './standardReportCard';
import KinderReportCard from './kinderReportCard';
import PlaygroupReportCard from './playgroupReportCard';
import styles from './styles';

export default class ReportCard extends Component {

  static propTypes = {
    //isLoading: React.PropTypes.bool,
    school: React.PropTypes.string,
    schoolDetails: React.PropTypes.object,
    reportData: React.PropTypes.object,
    examTypes:React.PropTypes.array,
    downloadReport: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  downloadReport() {
    //TO DO: build the html version of invoice....
    //this.props.downloadReport(html);
  }

  render() {
    const reportData = this.props.reportData;
    const examTypes = this.props.examTypes;
    const student = isNaN(this.props.studentId) ? undefined : this.props.students[this.props.studentId];
    const schoolDetails = this.props.schoolDetails[student.school];
    const useLetterhead = schoolDetails['Letterhead'] !== undefined ? true : false;
    let reportcard = null;

    switch (reportData.report_card_type) {
      case 'Kindergarten':
        reportcard = <KinderReportCard
          student={student}
          reportData={reportData} />
        break;
      case 'Playgroup':
        reportcard = <PlaygroupReportCard
          student={student}
          reportData={reportData} />
        break;
      default:
        reportcard = <StandardReportCard
          student={student}
          examTypes={examTypes}
          reportData={reportData} />
    }

    return (

      <View style={styles.container}>
        <PageHeader
          title={`Report Card ${reportData.term_name} ${reportData.year}`}
          backBtn={true}
          downloadBtn={true}
          backBtnOnPress={() => this.popRoute()}
          downloadBtnOnPress={() => this.downloadReport()} />

        <ScrollView>
        { reportData
          ? <View>
              <View style={styles.header}>
              {
                useLetterhead
                ? <View style={styles.schoolLetterhead}>
                    <Image style={styles.letterHeadImg} source={{uri: `http://${student.school}.eduweb.co.ke/assets/schools/${schoolDetails['Letterhead']}`}} />
                    <Text style={styles.reportTitle}>PROGRESS REPORT</Text>
                  </View>
                : <View style={styles.schoolHeader}>
                    <View>
                      <Image style={styles.schoolLogo} source={{uri: `http://${student.school}.eduweb.co.ke/assets/schools/${schoolDetails['logo']}`}} />
                    </View>
                    <View>
                      <Text style={styles.reportTitle}>PROGRESS REPORT</Text>
                      <Text style={styles.reportSubTitle}>{schoolDetails['School Name']}</Text>
                      <View style={styles.address}>
                        <Text>{schoolDetails['Address 1']} {schoolDetails['Address 2']}</Text>
                        <Text>Contact: {schoolDetails['Phone Number 2']} {schoolDetails['Phone Number']}</Text>
                        <Text>Email: {schoolDetails['Email Address']}</Text>
                      </View>
                    </View>
                  </View>
              }
              </View>
              <View style={styles.body}>
                {reportcard}
              </View>
            </View>
          : <Text>Oops! Seems something went wrong . . .</Text>
        }
        </ScrollView>
      </View>
    );
  }
}
