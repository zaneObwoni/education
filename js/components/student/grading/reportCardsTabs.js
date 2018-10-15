import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, Content, Spinner} from 'native-base';
import styles from './styles';
import moment from 'moment';

export default class ReportCardsTab extends Component {
  static propTypes = {
    reportCards: React.PropTypes.array,
    setReportIndex: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
  }

  viewReportCard(route, reportData) {
    this.props.setReportIndex(reportData);
    this.pushRoute(route);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    const reportCards = this.props.reportCards;

    return (
      <Container>
        <Content padder>
          { reportCards && reportCards.length > 0
            ? reportCards.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.itemContainer}
                  key={item.report_card_id}
                  onPress={() => this.viewReportCard('reportCard', item)}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.term_name} {item.year}</Text>
                    <Text style={styles.year}>{item.class_name}</Text>
                  </View>
                  <View style={styles.itemData}>
                    <Text style={styles.itemMeta}>
                      <Text style={styles.strong}>Date:</Text> {moment(item.date).format('MMM D, YYYY')}
                    </Text>
                    <Text style={styles.itemMeta}>
                      <Text style={styles.strong}>Teacher:</Text> {item.teacher_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })
            : <View>
    	          <Text style={styles.note}>There are currently have no published report cards.</Text>
    	        </View>
        }
        </Content>
      </Container>
    )
  }
}
