
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import Login from '../../components/login/';
import { checkUser, loginUser } from '../../actions/user';

const {
  replaceAt,
} = actions;

class LoginContainer extends Component {

  componentWillMount() {
    this.props.checkUser().then((res) => {
      if (this.props.isAuthenticated) {
        this.setState({'isCheckingUser': false});
        this.replaceRoute('home');
      }
    });
  }

  replaceRoute(route) {
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Login {...this.props} />
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    loginUser: (name, pwd, deviceId) => dispatch(loginUser(name, pwd, deviceId)),
    checkUser: () => dispatch(checkUser())
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  deviceId: state.notifications.deviceId,
  isAuthenticated: state.user.isAuthenticated,
  isLoggingIn: state.user.isLoggingIn,
  loginError: state.user.loginError,
  isCheckingUser: state.user.isCheckingUser
});

export default connect(mapStateToProps, bindActions)(LoginContainer);
