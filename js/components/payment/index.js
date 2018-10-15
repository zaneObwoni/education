
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Content, Spinner} from 'native-base';

import PageHeader from '../common/header';
import styles from './styles';
import { numberWithCommas, zeroPad } from '../student/fees/helpers';

export default class Payment extends Component {

  static propTypes = {
    isLoading: React.PropTypes.bool,
    paymentId: React.PropTypes.number,
    school: React.PropTypes.string,
    schoolDetails: React.PropTypes.object,
    lineItems: React.PropTypes.array,
    paymentDetails: React.PropTypes.object,
    feeSummary: React.PropTypes.object,
    downloadReceipt: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  downloadReceipt() {
    //TO DO: build the html version of invoice....
    //this.props.downloadReceipt(html);
  }

  render() {
    const { props: { paymentId, lineItems, feeSummary } } = this;
    let student = isNaN(this.props.studentId) ? undefined : this.props.students[this.props.studentId];

    return (
      <View style={styles.container}>
        <PageHeader
          title={`Receipt No. ${zeroPad(paymentId,5)}`}
          backBtn={true}
          downloadBtn={true}
          backBtnOnPress={() => this.popRoute()}
          downloadBtnOnPress={() => this.downloadReceipt()} />

        <Content padder>
        { this.props.isLoading
          ? <View><Spinner color='green' /></View>
          : lineItems
            ? <Text>Display receipt here.</Text>
            : <Text>Oops! Seems something went wrong . . .</Text>
        }
        </Content>
      </View>
    );
  }
}
