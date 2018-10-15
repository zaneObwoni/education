
import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
// import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import { Container, Content, Text, View } from 'native-base';
import Modal from 'react-native-modalbox';

import AppNavigator from './AppNavigator';
import ProgressBar from './components/loaders/ProgressBar';

import { connect } from 'react-redux';
import { setDeviceUserId, updateDeviceUserId } from './actions/notifications';

import theme from './themes/base-theme';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDownloadingModal: false,
            showInstalling: false,
            downloadProgress: 0,
        };
    }

    componentDidMount() {

        /*
        CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE },
          (status) => {
            switch (status) {
              case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({ showDownloadingModal: true });
                this._modal.open();
                break;
              case CodePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({ showInstalling: true });
                break;
              case CodePush.SyncStatus.UPDATE_INSTALLED:
                this._modal.close();
                this.setState({ showDownloadingModal: false });
                break;
              default:
                break;
            }
          },
          ({ receivedBytes, totalBytes }) => {
            this.setState({ downloadProgress: (receivedBytes / totalBytes) * 100 });
          }
        );
        */

        // if(Platform.OS === 'ios'){
        //     OneSignal.configure({
        //         onIdsAvailable: this.setDeviceId.bind(this),
        //         enableInAppAlertNotification: true,
        //         onNotificationReceived: function(notification) {
        //             console.log("notification received: ", notification);
        //         },
        //         onNotificationOpened: function(openResult) {
        //             console.log('MESSAGE: ', openResult.notification.payload.body);
        //             console.log('DATA: ', openResult.notification.payload.additionalData);
        //             console.log('ISACTIVE: ', openResult.notification.isAppInFocus);
        //             console.log('openResult: ', openResult);
        //             // Do whatever you want with the objects here
        //             // _navigator.to('main.post', data.title, { // If applicable
        //             //  article: {
        //             //    title: openResult.notification.payload.body,
        //             //    link: openResult.notification.payload.launchURL,
        //             //    action: data.openResult.notification.action.actionSelected
        //             //  }
        //             // });
        //         }
        //     });
        //     OneSignal.enableInAppAlertNotification(true);
        // }


    }

    setDeviceId(device) {
        this.props.setDeviceUserId(device.userId);
        if (this.props.user && this.props.user.parentId) {
            this.props.updateDeviceUserId(this.props.user.parentId, device.userId);
        }
    }

    render() {
        if (this.state.showDownloadingModal) {
            return (
                <Container theme={theme} style={{ backgroundColor: theme.defaultBackgroundColor }}>
                    <Content style={styles.container}>
                        <Modal
                            style={[styles.modal, styles.modal1]}
                            backdrop={false}
                            ref={(c) => { this._modal = c; }}
                            swipeToClose={false}
                        >
                            <View
                                style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}
                            >
                                {this.state.showInstalling ?
                                    <Text
                                        style={{
                                            color: theme.brandPrimary,
                                            textAlign: 'center',
                                            marginBottom: 15,
                                            fontSize: 15,
                                        }}
                                    >
                                        Installing update...
                                    </Text> :
                                    <View
                                        style={{
                                            flex: 1,
                                            alignSelf: 'stretch',
                                            justifyContent: 'center',
                                            padding: 20,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: theme.brandPrimary,
                                                textAlign: 'center',
                                                marginBottom: 15,
                                                fontSize: 15,
                                            }}
                                        >
                                            Downloading update... {`${parseInt(this.state.downloadProgress, 10)} %`}
                                        </Text>
                                        <ProgressBar
                                            color="theme.brandPrimary"
                                            progress={parseInt(this.state.downloadProgress, 10)}
                                        />
                                    </View>
                                }
                            </View>
                        </Modal>
                    </Content>
                </Container>
            );
        }

        return <AppNavigator />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal1: {
        height: 300,
    },
});

function bindAction(dispatch) {
    return {
        setDeviceUserId: deviceId => dispatch(setDeviceUserId(deviceId)),
        updateDeviceUserId: (parentId, deviceId) => dispatch(updateDeviceUserId(parentId, deviceId)),
    };
}
const mapStateToProps = state => ({
    deviceId: state.notifications.deviceId,
    user: state.user.user,
});

export default connect(mapStateToProps, bindAction)(App);
