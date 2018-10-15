import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Content, } from 'native-base';
import styles from './styles';
import {
  getSummaryStyle,
  getSummaryNumberStyle,
  numberWithCommas,
  getNumberStyle,
  getBalanceText
} from './helpers';

export default class SummaryTab extends Component {
  static propTypes = {
    summary: React.PropTypes.array,
    balance: React.PropTypes.object,
  }

  render() {
    const { props: { balance, summary } } = this;

    return (
      <Container>
        <Content padder>
        {
          balance.balance
          ? <View style={styles.summaryContainer}>
              <View style={[getSummaryStyle(balance.total_credit),styles.summaryBox]}>
                <Text style={[getSummaryNumberStyle(balance.total_credit), styles.summaryTitle]}>Credit</Text>
                <Text style={[getSummaryNumberStyle(balance.total_credit), styles.summaryAmt]}>
                  {numberWithCommas(balance.total_credit)} {balance.currency}
                </Text>
              </View>
              <View style={[getSummaryStyle(balance.arrears),styles.summaryBox]}>
                <Text style={[getSummaryNumberStyle(balance.arrears), styles.summaryTitle]}>Arrears</Text>
                <Text style={[getSummaryNumberStyle(balance.arrears), styles.summaryAmt]}>
                  {numberWithCommas(balance.arrears)} {balance.currency}
                </Text>
              </View>
              <View style={[getSummaryStyle(balance.balance), styles.summaryBox]}>
                <Text style={[getSummaryNumberStyle(balance.balance), styles.summaryTitle]}>Balance</Text>
                <Text style={[getSummaryNumberStyle(balance.balance), styles.summaryAmt]}>
                  {numberWithCommas(balance.balance)} {balance.currency}
                </Text>
              </View>
            </View>
          : null
        }
        { summary.length > 0
          ? summary.map((item, key) => {
            return (
              <View style={styles.itemContainer} key={key}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{item.fee_item}</Text>
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
                  <Text style={styles.itemMeta}>
                    <Text style={styles.strong}>Opening:</Text> {numberWithCommas(item.total_due)} {item.currency}
                  </Text>
                  <Text style={styles.itemMeta}>
                    <Text style={styles.strong}>Paid:</Text> {numberWithCommas(item.total_paid)} {item.currency}
                  </Text>
                </View>
              </View>
            )
          })
          : <View>
  	          <Text style={styles.note}>You currently have no fee items.</Text>
  	        </View>
  			}
        </Content>
      </Container>
    )
  }
}
