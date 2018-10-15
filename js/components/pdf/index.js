
import React, { Component } from 'react';
import PDFView from 'react-native-pdf-view';

import styles from './styles';

export default class PdfViewer extends Component {

  static propTypes = {
    isLoading: React.PropTypes.bool,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <View style={styles.container}>
        <PageHeader
          title='PDF'
          backBtn={true}
          trashBtn={true}
          backBtnOnPress={() => this.popRoute()}
          />
        <PDFView
          ref={(pdf)=>{this.pdfView = pdf;}}
          path={this.props.fileLocation}
          onLoadComplete = {(pageCount)=>{
            this.pdfView.setNativeProps({
              zoom: 1.0
            });
            console.log("Load Complete. File has " + pageCount + " pages.");
          }}
          style={styles.pdf} />
      </View>
    );
  }
}
