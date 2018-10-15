import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, Content, Spinner} from 'native-base';
import styles from './styles';
import {
  getSummaryStyle,
  getSummaryNumberStyle,
  numberWithCommas,
  getNumberStyle,
  getBalanceText
} from './helpers';
import moment from 'moment';


export default class InvoicesTab extends Component {
  static propTypes = {
    invoices: React.PropTypes.array,
    balance: React.PropTypes.object,
    fetchStudentInvoices: React.PropTypes.func,
    setInvoiceIndex: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    // TO DO: this will only need to run if data is stale
    this.props.fetchStudentInvoices(this.props.school, this.props.studentId).then( (res) => {
        this.setState({loading: false });
    });
  }

  viewInvoice(route, school, index, invoiceData) {
    this.props.setInvoiceIndex(school, index, invoiceData);
    this.pushRoute(route);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    const invoices = this.props.invoices;

    return (
      <Container>
        <Content padder>
        { this.state.loading
          ? <View><Spinner color='green' /></View>
          : invoices && invoices.length > 0
            ? invoices.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.itemContainer}
                  key={item.inv_id}
                  onPress={() => this.viewInvoice('invoice', this.props.school, item.inv_id, item)}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{`Inv #${item.inv_id}`}</Text>
                    <View style={styles.balanceContainer}>
                      <Text style={[getNumberStyle(item.balance),styles.balanceDesc]}>
                        {getBalanceText(item.balance)}
                      </Text>
                      <Text style={[getNumberStyle(item.balance),styles.balance]}>
                        {numberWithCommas(item.balance)}<Text style={styles.muted}> {item.currency}</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.itemData}>
                    <View>
                      <Text style={styles.itemMeta}>
                        <Text style={styles.strong}>Inv Date:</Text> {moment(item.inv_date).format('MMM D, YYYY')}
                      </Text>
                      <Text style={styles.itemMeta}>
                        <Text style={styles.strong}>Due Date:</Text> {moment(item.due_date).format('MMM D, YYYY')}
                        </Text>
                    </View>
                    <View>
                      <Text style={styles.itemMeta}>
                        <Text style={styles.strong}>Inv Total:</Text> {numberWithCommas(item.total_due)} {item.currency}
                      </Text>
                      <Text style={styles.itemMeta}>
                        <Text style={styles.strong}>Amt Paid:</Text> {numberWithCommas(item.total_paid)} {item.currency}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
            : <View>
    	          <Text style={styles.note}>You currently have no invoices.</Text>
    	        </View>
        }
        </Content>
      </Container>
    )
  }
}
