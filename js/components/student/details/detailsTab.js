import React, { Component } from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
import styles from './styles';

export default class DetailsTab extends Component {
  static propTypes = {
    student: React.PropTypes.object.isRequired
  }

  render() {
    let student = this.props.student;

    return (
      <Container>
        <Content>
          <List>
            <ListItem style={styles.listItem}>
              <Text style={styles.label}>Admission Date</Text>
              <Text style={styles.value}>{student.admission_date}</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={styles.label}>Admission Number</Text>
              <Text style={styles.value}>{student.admission_number}</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={styles.label}>Student Category</Text>
              <Text style={styles.value}>{student.student_category}</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={styles.label}>First Name</Text>
              <Text style={styles.value}>{student.first_name}</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={styles.label}>Middle Name</Text>
              <Text style={styles.value}>{student.middle_name}</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={styles.label}>Last Name</Text>
              <Text style={styles.value}>{student.last_name}</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.value}>{student.gender}</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={styles.label}>Date of Birth</Text>
              <Text style={styles.value}>{student.dob}</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={styles.label}>Class Entry</Text>
              <Text style={styles.value}>{student.class_name}</Text>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Text style={styles.label}>Payment Plan</Text>
              <Text style={styles.value}>{student.payment_plan_name}</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}
