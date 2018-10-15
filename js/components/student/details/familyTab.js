import React, { Component } from 'react';
import { Container, Content, Text, View, Card, CardItem, Icon } from 'native-base';
import styles from './styles';

export default class FamilyTab extends Component {
  static propTypes = {
    details: React.PropTypes.object.isRequired
  }

  render() {

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header>
                <Icon name="md-people" />
                <Text>Parents/Guardians</Text>
            </CardItem>

            { this.props.details.guardians.map((guardian) => {
              return (
                <CardItem key={guardian.guardian_id}>
                  <Text>{guardian.first_name.toUpperCase()} {guardian.last_name.toUpperCase()} ({guardian.relationship})</Text>
                  <Text>{guardian.telephone}</Text>
                  <Text>{guardian.email}</Text>
                </CardItem>
              )
            })}

            <CardItem header>
                <Icon name="md-alert" />
                <Text>Emergency Contact</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.details.emergency_name} ({this.props.details.emergency_relationship})</Text>
              <Text>{this.props.details.emergency_telephone}</Text>
            </CardItem>

            <CardItem header>
                <Icon name="md-car" />
                <Text>Drop Off/Pick Up Individual</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.details.pick_up_drop_off_individual || 'none specified'}</Text>
            </CardItem>


          </Card>
        </Content>
      </Container>
    )
  }
}
