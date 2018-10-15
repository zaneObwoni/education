
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import PdfViewer from '../../components/pdf/';

const {
  popRoute,
} = actions;

class PdfViewerContainer extends Component {

  render() {
    return (
      <PdfViewer {...this.props} />
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  fileLocation: state.pdf.fileLocation,
});


export default connect(mapStateToProps, bindAction)(PdfViewerContainer);
