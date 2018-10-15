import React, { Component } from 'react';
import ReactNative from 'react-native';
import { Header, Title, Button, Icon } from 'native-base';
const { StyleSheet } = ReactNative;

export default class PageHeader extends Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    backBtn: React.PropTypes.bool,
    menuBtn: React.PropTypes.bool,
    trashBtn: React.PropTypes.bool,
    downloadBtn: React.PropTypes.bool,
    hasTabs: React.PropTypes.bool,
    backBtnOnPress: React.PropTypes.func,
    menuBtnOnPress: React.PropTypes.func,
    trashBtnOnPress: React.PropTypes.func,
    downloadBtnOnPress: React.PropTypes.func,
  }

  render() {
    return (
      <Header style={styles.pageHeader}>
        { this.props.backBtn
          ? <Button transparent onPress={this.props.backBtnOnPress}>
              <Icon name="md-arrow-back" />
            </Button>
          : ''
        }
        { this.props.menuBtn
          ? <Button transparent onPress={this.props.menuBtnOnPress}>
              <Icon name="md-menu" />
            </Button>
          : ''
        }

        <Title>{ this.props.title.toUpperCase() }</Title>

        { this.props.trashBtn
          ? <Button transparent onPress={this.props.trashBtnOnPress}>
              <Icon name="md-trash" />
            </Button>
          : ''
        }
        { this.props.downloadBtn
          ? <Button transparent onPress={this.props.downloadBtnOnPress}>
              <Icon name="md-download" />
            </Button>
          : ''
        }
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  pageHeader: {
    backgroundColor: '#397C49',
  },
});
