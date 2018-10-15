import React, { Component } from 'react';
import { Container, Content, Text, View, Card, CardItem, Icon } from 'native-base';
import styles from './styles';

export default class EnrolledTab extends Component {
  static propTypes = {
    details: React.PropTypes.object.isRequired
  }

  render() {

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header>
                <Icon name="md-checkmark-circle-outline" />
                <Text>Enrolled In</Text>
            </CardItem>
            { this.props.details.fee_items.map((feeItem,key) => {
              return (
                <CardItem key={key}>
                  <Text>{feeItem.fee_item}</Text>
                </CardItem>
              )
            })}
          </Card>
        </Content>
      </Container>
    )
  }
}
