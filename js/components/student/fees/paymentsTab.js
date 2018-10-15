import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, Content, Spinner} from 'native-base';
import styles from './styles';
import { numberWithCommas, zeroPad } from './helpers';
import moment from 'moment';

export default class PaymentsTab extends Component {
  static propTypes = {
    payments: React.PropTypes.array,
    balance: React.PropTypes.object,
    fetchStudentPayments: React.PropTypes.func,
    setPaymentIndex: React.PropTypes.func,
    pushRoute: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    // TO DO: this will only need to run if data is stale
    this.props.fetchStudentPayments(this.props.school, this.props.studentId).then( (res) => {
        this.setState({loading: false });
    });
  }

  viewReceipt(route, school, index) {
    this.props.setPaymentIndex(school, index, this.props.studentId);
    this.pushRoute(route);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  isReversed(reversed) {
    return reversed ? 'reversePayment' : '';
  }

  render() {
    const payments = this.props.payments;

    return (
      <Container>
        <Content padder>
        { this.state.loading
          ? <View><Spinner color='green' /></View>
          : payments && payments.length > 0
            ? payments.map((item) => {

              return (
                <TouchableOpacity
                  style={[this.isReversed(item.reversed), styles.itemContainer]}
                  key={item.payment_id}
                  onPress={() => this.viewReceipt('payment', this.props.school, item.payment_id)}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{`Receipt No. ${zeroPad(item.payment_id,5)}`}</Text>
                    <View style={styles.balanceContainer}>
                      <Text style={styles.balance}>
                        {numberWithCommas(item.amount)}<Text style={styles.muted}> {item.currency}</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.itemData}>
                    <Text style={styles.itemMeta}>
                      <Text style={styles.strong}>Recieved:</Text> {moment(item.payment_date).format('MMM D, YYYY')}
                    </Text>
                    <Text style={styles.itemMeta}>
                      <Text style={styles.strong}>Method:</Text> {item.payment_method}
                    </Text>
                    <Text style={styles.itemMeta}>
                      <Text style={styles.strong}>Applied To:</Text> {item.applied_to}
                    </Text>
                    <Text style={styles.itemMeta}>
                      <Text style={styles.strong}>Applied Unapplied:</Text>
                        {numberWithCommas(item.unapplied_amount)} <Text style={styles.muted}> {item.currency}</Text>
                    </Text>
                  </View>
                  {
                    item.reversed ? <View style={styles.reversedWatermark}><Text style={styles.reverseText}>Reversed</Text></View> : null
                  }
                </TouchableOpacity>
              )
            })
            : <View>
    	          <Text style={styles.note}>You currently have no payments.</Text>
    	        </View>
        }
        </Content>
      </Container>
    )
  }
}
