
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Content, Spinner} from 'native-base';

import PageHeader from '../common/header';
import styles from './styles';

export default class Invoice extends Component {

  static propTypes = {
    isLoading: React.PropTypes.bool,
    invoiceId: React.PropTypes.number,
    school: React.PropTypes.string,
    schoolDetails: React.PropTypes.object,
    lineItems: React.PropTypes.array,
    invoiceData: React.PropTypes.object,
    credit: React.PropTypes.array,
    arrears: React.PropTypes.object,
    downloadInvoice: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  downloadInvoice() {
    //TO DO: build the html version of invoice....
    //this.props.downloadInvoice(html);
  }

  render() {
    const { props: { invoiceId, lineItems, credit, arrears, invoiceData } } = this;
    let student = isNaN(this.props.studentId) ? undefined : this.props.students[this.props.studentId];

    return (
      <View style={styles.container}>
        <PageHeader
          title={`Invoice ${invoiceId}`}
          backBtn={true}
          downloadBtn={true}
          backBtnOnPress={() => this.popRoute()}
          downloadBtnOnPress={() => this.downloadInvoice()} />

        <Content padder>
        { this.props.isLoading
          ? <View><Spinner color='green' /></View>
          : lineItems
            ? <Text>Display invoice here.</Text>
            : <Text>Oops! Seems something went wrong . . .</Text>
        }
        </Content>
      </View>
    );
  }
}
