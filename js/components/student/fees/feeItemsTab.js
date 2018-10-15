import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Content, Spinner} from 'native-base';
import { numberWithCommas } from './helpers';
import styles from './styles';

export default class FeeItemsTab extends Component {
  static propTypes = {
    feeItems: React.PropTypes.array,
    balance: React.PropTypes.object,
    fetchStudentFeeItems: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    // TO DO: this will only need to run if data is stale
    this.props.fetchStudentFeeItems(this.props.school, this.props.studentId).then( (res) => {
        this.setState({loading: false });
    });
  }

  render() {
    const feeItems = this.props.feeItems;

    return (
      <Container>
        <Content padder>
        { this.state.loading
          ? <View><Spinner color='green' /></View>
          : feeItems && feeItems.length > 0
            ? feeItems.map((item, key) => {
              return (
                <View style={styles.itemContainer} key={key}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.fee_item}</Text>
                    <View style={styles.balanceContainer}>
                      <Text style={styles.balance}>
                        {numberWithCommas(item.amount)} <Text style={styles.muted}>{item.currency}/{item.frequency}</Text>
                      </Text>
                    </View>
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
