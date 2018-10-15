
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import Account from '../../components/account/';
import { openDrawer } from '../../actions/drawer';
import { resetPass } from '../../actions/user';

const {
    popRoute,
    pushRoute,
    replaceAt
} = actions;

class AccountContainer extends Component {


    replaceRoute(route) {
        this.props.replaceAt('login', { key: route }, this.props.navigation.key);
    }

    render() {
        return (
            <Account {...this.props} />
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        popRoute: key => dispatch(popRoute(key)),
        pushRoute: (route, key) => dispatch(pushRoute(route, key)),
        resetPass: payload => dispatch(resetPass(payload)),
        replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    user: state.user
});

export default connect(mapStateToProps, bindAction)(AccountContainer);
