
import React, { Component } from 'react';
import { Image } from 'react-native';

import { Container, Content, InputGroup, Input, Button, Icon, View, Text, Spinner } from 'native-base';
import styles from './styles';

const background = require('../../../images/eduweb-logo.png');

export default class Login extends Component {

    static propTypes = {
        deviceId: React.PropTypes.string,
        loginUser: React.PropTypes.func,
        replaceAt: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pwd: '',
      error: false,
      errorMsg:''
    };
  }

  replaceRoute(route) {
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  login() {
    console.log('login')
    this.setState({error:false, errorMsg:''});
    console.log(this.state.name)
    console.log(this.state.pwd)
    if(this.state.name && this.state.pwd) {
      this.setState({loggingIn: true});
      this.props.loginUser(this.state.name, this.state.pwd, this.props.deviceId)
        .then((res) => {
          this.setState({loggingIn: false});
          if (this.props.isAuthenticated) {
            this.replaceRoute('home');
          }
        });
    }
    else {
      this.setState({error: true, errorMsg: 'You must enter a username and password'});
    }
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
        { this.props.isCheckingUser
          ? <Content>
              <Spinner color='white' />
            </Content>
          : <Content>
              <Image source={background} style={styles.shadow}>
                <View style={styles.bg}>
                  <InputGroup style={styles.input}>
                    <Icon name="md-person" />
                    <Input placeholder="USERNAME" value={this.state.name} onChangeText={name => this.setState({ name })} />
                  </InputGroup>
                  <InputGroup style={styles.input}>
                    <Icon name="md-lock" />
                    <Input
                      placeholder="PASSWORD"
                      secureTextEntry
                      onChangeText={pwd => this.setState({ pwd })}
                    />
                  </InputGroup>
                  { this.state.error ? <Text style={styles.error}>{this.state.errorMsg}</Text> : null }
                  <Button style={styles.btn} onPress={() => this.login()}>
                    { this.props.isLoggingIn ? 'Logging In...' : this.props.isAuthenticated ? 'Success!' : 'LOGIN' }
                  </Button>

                </View>
              </Image>
            </Content>
          }
        </View>
      </Container>
    );
  }
}
