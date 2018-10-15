
import React, { Component } from 'react';
import { WebView, TouchableHighlight, View, Text, Image, Alert } from 'react-native';
import { Content, Card, CardItem, Icon } from 'native-base';

import PageHeader from '../common/header';
import styles from './styles';

import RNFetchBlob from 'react-native-fetch-blob';

const script = `
<script>
	window.location.hash = 1;
    var calculator = document.createElement("div");
    calculator.id = "height-calculator";
    while (document.body.firstChild) {
        calculator.appendChild(document.body.firstChild);
    }
	document.body.appendChild(calculator);
    document.title = calculator.scrollHeight;
</script>
`;
const style = `
<style>
body, html, #height-calculator {
    margin: 0;
    padding: 0;
}
#height-calculator {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    line-height:24px;
}
</style>
`;

let jobId = -1;
const validExts = ['pdf','doc','docx','xls','xlsx','jpg','jpeg','png','gif','mpeg','mp3','mp4','zip'];
const mimeTypes = ['application/pdf','application/msword',
									 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
									 'application/vnd.ms-excel',
									 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
								   'image/jpeg','image/jpeg','image/png','image/gif','video/mpeg',
									 'video/mpeg','video/mpeg','application/zip, application/x-compressed-zip'];
const inlineTypes = ['jpg','jpeg','png','gif'];
let dirs = RNFetchBlob.fs.dirs;
const android = RNFetchBlob.android;

export default class News extends Component {

  static propTypes = {
    isLoading: React.PropTypes.bool,
    newsId: React.PropTypes.number,
    school: React.PropTypes.string,
    news: React.PropTypes.object,
    trashNews: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
	    height:0,
	    output: '',
			fileLocation:'',
			fileReady:false,
      hasAttachment:false,
      showInline: false,
      filename:''
    };
  }

  componentWillMount() {
    const downloadUrl = this.props.news[this.props.school][this.props.newsId].attachment ?
      `http://${this.props.school}.eduweb.co.ke/assets/posts/${this.props.news[this.props.school][this.props.newsId].attachment}` : '';
    const showAttachment = this.isValidAttachement(downloadUrl);

    if (showAttachment) {
      const ext = this.getFileType(downloadUrl);

      if (validExts.indexOf(ext) > -1) {
        this.setState({filename: downloadUrl});
        this.setState({hasAttachment: true});

        if (inlineTypes.indexOf(ext) > -1) {
          this.setState({showInline:true});
        }
  		} else {
        this.setState({hasAttachment: false});
      }

    }

  }

	componentWillUnmount() {
		// remove all files in a session
  	RNFetchBlob.session('news').dispose();
	}

  onNavigationChange(event) {
    if (event.title) {
      const htmlHeight = Number(event.title) || 0; //convert to number
      this.setState({height:htmlHeight});
    }
  }

	downloadFile (url) {
		// Random file name needed to force refresh...
		const ext = this.getFileType(url);
		const mimeType = mimeTypes[validExts.indexOf(ext)];
    const downloadDest = `${dirs.DCIMDir}/${((Math.random() * 1000) | 0)}.${ext}`;

		RNFetchBlob
	    .config({
					session : 'news',
					fileCache : true,
	        path : downloadDest,
					addAndroidDownloads : {
				    useDownloadManager : true,
				    mediaScannable : true,
				    notification : false,
						mime: mimeType
				  }
	    })
	    .fetch('GET', url)
	    .then((res) => {
				RNFetchBlob.fs.scanFile([ { path : res.path(), mime : mimeType} ]);
				this.setState({fileLocation: res.path(), fileReady: true});
				android.actionViewIntent(res.path(), mimeType).then((success) => {
		      console.log('success: ', success)
		    })
		    .catch((err) => {
					let alertMsg = '';
					switch (mimeType ) {
						case 'pdf' :
							alertMsg = 'You must install a PDF viewer on your device to view this document.';
							break;
						case 'doc':
						case 'docx':
							alertMsg = 'You must install a Microsoft Doc viewer on your device to view this document.';
							break;
						case 'xls':
						case 'xlsx':
								alertMsg = 'You must install a Microsoft Excel on your device to view this document.';
								break;
						default:
							alertMsg = `You do not have an appropriate app to open file types: ${mimeType}.`;
					}
					Alert.alert(
            'No App Found',
            `${alertMsg} Use Google Play Store to find and install an app to view this file.`
          );
		    });
			})
	    .then(() => {
	        // scan file success
					//this.props.pushRoute({ key: 'pdfViewer', index: 1 }, this.props.navigation.key);
					console.log('success');
	    })
	    .catch((err) => {
	        // scan file error
					console.log('error');
	    })

	}

  showError (err) {
    this.setState({ output: `ERROR: Code: ${err.code} Message: ${err.message}` });
  }

  getFileType (filename) {
		return filename.substring( filename.lastIndexOf('.') + 1).toLowerCase();
	}

  isValidAttachement(filename) {
		const ext = this.getFileType(filename);

		if (validExts.indexOf(ext) > -1) {
      return true;
		}
		return false;
	}

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    const { props: { newsId, school, news } } = this;
    const email = news[school][newsId] ? news[school][newsId]: {};
    const emailHTML = news[school][newsId] ? news[school][newsId].message : '';

    return (
      <View style={styles.container}>
      <PageHeader
        title='News'
        backBtn={true}
        trashBtn={true}
        backBtnOnPress={() => this.popRoute()} />

        <Content padder>
          { news[school][newsId]
            ? <Card>
                <CardItem style={styles.header}>
                  <Text style={styles.heading}>{email.subject}</Text>
                  <Text style={styles.note}>{email.posted_by} {email.creation_date}</Text>
                </CardItem>
                <CardItem>
                  <View>
                    { this.state.showInline
                      ? <Image style={styles.pic} source={{uri: this.state.filename}} />
                      : null
                    }

                    <WebView
                      scrollEnabled={false}
                      source={{html:emailHTML+style+script}}
                      style={{height:this.state.height}}
                      javaScriptEnabled ={true}
                      onNavigationStateChange={this.onNavigationChange.bind(this)}>
                    </WebView>
                  </View>
                </CardItem>
              </Card>
            : <Text>Oops! Seems something went wrong . . .</Text>
           }
           { this.state.hasAttachment && !this.state.showInline
             ? <TouchableHighlight onPress={this.downloadFile.bind(this, this.state.filename) }>
                 <View style={styles.attachment}>
                   <Icon style={styles.attachmentIcon} name='md-attach' />
                   <Text style={styles.strong}>Attachment:</Text>
                   <Text style={styles.link}>View file</Text>
                 </View>
               </TouchableHighlight>
             : null
           }
        </Content>
      </View>
    );
  }
}
