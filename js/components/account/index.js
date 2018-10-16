
import React, { Component } from 'react';
import {Alert} from 'react-native';
import { View, Content, List, ListItem, InputGroup, Icon, Input, Button, Text } from 'native-base';

import PageHeader from '../common/header';
import styles from './styles';

export default class Account extends Component {

    static propTypes = {
        user: React.PropTypes.object,
        openDrawer: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    };

    constructor(props) {
        super(props);
        this.state = {
            cpwd: '',
            npwd: '',
            cnpwd: '',
            error: false,
            errorMsg:''
        };
    }

    replaceRoute(route) {
        this.props.replaceAt('home', { key: route }, this.props.navigation.key);
    }

    resetPass(){

        let {cpwd, npwd, cnpwd} = this.state;
        let id = this.props.user.user.parentId;

        let payload = {
            cpwd,
            npwd,
            cnpwd,
            id: id
        };

        if(payload.cpwd && payload.npwd && payload.cnpwd) {
            if(npwd !== cnpwd){
                this.setState({errorMsg: 'Ensure the new entered passwords match!'});
            }

            this.props.resetPass(payload)
                .then(res=>{
                    if(res.data.response === "success"){
                        Alert.alert('Success!', 'Your password has been reset successfully');
                        this.replaceRoute('home');
                    } else if(res.data.response === 'error'){
                        Alert.alert('Error!', 'Sorry you have entered wrong credentials. Please re-enter and try again');
                    }
                })

        } else {
            this.setState({errorMsg: 'Please enter all fields!'});
        }


    }



    render() { // eslint-disable-line class-methods-use-this

        let { errorMsg } = this.state;

        return (
            <View style={styles.container}>
                <PageHeader
                    title='Change Password'
                    menuBtn={true}
                    menuBtnOnPress={this.props.openDrawer} />

                <Content>
                    <List>
                        <ListItem>
                            <InputGroup>
                                <Input
                                    stackedLabel label="Current Password"
                                    secureTextEntry
                                    onChangeText={cpwd => this.setState({ cpwd })}
                                />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input
                                    stackedLabel
                                    label="New Password"
                                    secureTextEntry
                                    onChangeText={npwd => this.setState({ npwd })}
                                />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input
                                    stackedLabel
                                    label="Verify New Password"
                                    secureTextEntry
                                    onChangeText={cnpwd => this.setState({ cnpwd })}
                                />
                            </InputGroup>
                        </ListItem>

                        {
                            errorMsg
                                ?
                                <Text style={{alignSelf: 'center', color: 'red'}}> Ensure the new entered passwords match!</Text>
                                : null
                        }

                    </List>
                    <Button
                        style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor:'#009e0f'}}
                        onPress={() => this.resetPass()}
                    >
                        Update Password
                    </Button>
                </Content>
            </View>
        );
    }
}
