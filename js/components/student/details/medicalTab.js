import React, { Component } from 'react';
import { Container, Content, Text, Card, CardItem, Icon } from 'native-base';
import styles from './styles';

export default class MedicalTab extends Component {
  static propTypes = {
    details: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header>
                <Icon name="md-medkit" />
                <Text>Medical</Text>
            </CardItem>

            { this.props.details.medical_history.map((medical) => {
              return (
                <CardItem key={medical.medical_id}>
                  <Text style={styles.highlight}>{medical.illness_condition}</Text>
                  <Text>{medical.comments || '-'}</Text>
                </CardItem>
              )
            })}

            <CardItem header>
                <Text>Has your child had any other serious illnesses or allergies?</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.details.other_medical_conditions ? 'Yes' : 'No'}</Text>
              <Text>{this.props.details.other_medical_conditions_description || '-'}</Text>
            </CardItem>

            <CardItem header>
                <Text>Has your child been hospitalized or undergone any operations?</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.details.hospitalized ? 'Yes' : 'No'}</Text>
              <Text>{this.props.details.hospitalized_description || '-'}</Text>
            </CardItem>

            <CardItem header>
                <Text>Is your child being treated for a medical illness or on any medications currently?</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.details.current_medical_treatment ? 'Yes' : 'No'}</Text>
              <Text>{this.props.details.current_medical_treatment_description || '-'}</Text>
            </CardItem>

            <CardItem header>
                <Text>Comments</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.details.comments || 'none'}</Text>
            </CardItem>

          </Card>
        </Content>
      </Container>
    )
  }
}
