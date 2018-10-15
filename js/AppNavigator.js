
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';

import LoginContainer from './containers/login/';
import HomeContainer from './containers/home/';
import NewsContainer from './containers/news/';
import StudentContainer from './containers/student/main/';
import StudentDetails from './containers/student/details';
import StudentBlog from './containers/student/blog';
import StudentFees from './containers/student/fees';
import StudentGrading from './containers/student/grading';
import AccountContainer from './containers/account';
//import PdfViewerContainer from './containers/pdf';
import InvoiceContainer from './containers/invoice';
import PaymentContainer from './containers/payment';
import ReportCardContainer from './containers/reportCard';
//import Settings from './containers/settings/';
//import SplashPage from './components/splashscreen/';
import SideBar from './containers/sideBar';
import { statusBarColor } from './themes/base-theme';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'login':
        return <LoginContainer />;
      case 'home':
        return <HomeContainer />;
      case 'news':
        return <NewsContainer />;
      case 'studentMain':
        return <StudentContainer />;
      case 'studentDetails':
        return <StudentDetails />
      case 'studentBlog':
        return <StudentBlog />
      case 'studentFees':
        return <StudentFees />
      case 'studentGrading':
        return <StudentGrading />;
      case 'account':
        return <AccountContainer />;
      //case 'pdfViewer':
      //  return <PdfViewerContainer />;
      case 'invoice':
        return <InvoiceContainer />
      case 'payment':
        return <PaymentContainer />
      case 'reportCard':
        return <ReportCardContainer />
      default :
        return <LoginContainer />;
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="default"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
