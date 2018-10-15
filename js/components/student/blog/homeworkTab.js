import React, { Component } from 'react';
import { WebView, Text, View, TouchableHighlight, Alert } from 'react-native';
import { Content, Icon } from 'native-base';
import styles from './styles';
import moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob';
//import RNFS from 'react-native-fs';
//import FileOpener from 'react-native-file-opener';

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
let dirs = RNFetchBlob.fs.dirs;
const android = RNFetchBlob.android;

export default class HomeworkTab extends Component {
  static propTypes = {
    homework: React.PropTypes.array,
		school: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
	    height:0,
	    output: '',
			fileLocation:'',
			fileReady:false
    };
  }

	componentWillUnmount() {
		// remove all files in a session
  	RNFetchBlob.session('homework').dispose();
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
					session : 'homework',
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
/*
  downloadFile (background, url) {
    console.log(url);
    if (jobId !== -1) {
      this.setState({ output: 'A download is already in progress' });
    }

    const progress = data => {
      const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
      const text = `Progress ${percentage}%`;
      this.setState({ output: text });
    };

    const begin = res => {
      this.setState({ output: 'Download has begun' });
    };

    const progressDivider = 1;

    // Random file name needed to force refresh...
		const ext = this.getFileType(url);
		console.log({ext});
    const downloadDest = `${RNFS.ExternalDirectoryPath}/${((Math.random() * 1000) | 0)}.${ext}`;

    const ret = RNFS.downloadFile({ fromUrl: url, toFile: downloadDest, begin, progress, background, progressDivider });
    console.log(ret);
    jobId = ret.jobId;

    ret.promise.then(res => {
			console.log(downloadDest);
      this.setState({ output: JSON.stringify(res) });

			FileOpener.open(
          downloadDest,
          'application/pdf'
      ).then(() => {
          console.log('success!!');
      },(e) => {
				console.log(e);
          console.log('error!!');
      });

      jobId = -1;
    }).catch(err => {
			console.log('error');
      this.showError(err)

      jobId = -1;
    });
  }
*/
	showError (err) {
    this.setState({ output: `ERROR: Code: ${err.code} Message: ${err.message}` });
  }

	getFileType (filename) {
		return filename.substring( filename.lastIndexOf('.') + 1);
	}

	isValidAttachement(filename) {
		const ext = this.getFileType(filename);
		if (validExts.indexOf(ext) > -1) {
			return true;
		}
		return false;
	}

  render() {
    let homework = this.props.homework || [];

    return (
			<Content padder>
			{ homework.length > 0
        ? homework.map((post) => {
            let html = post.body;
            const postDate = moment(post.assigned_date).format('MMM D, YYYY');
            const dueDate = post.due_date ? moment(post.due_date).format('MMM D, YYYY') : '';
            const downloadUrl = post.attachment ? `http://${this.props.school}.eduweb.co.ke/assets/posts/${post.attachment}` : '';
						const showAttachment = this.isValidAttachement(downloadUrl);

            return (
            <View style={styles.blogEntry} key={post.homework_id}>
              <View style={styles.homeworkHeader}>
                <Text style={styles.homeworkTitle}>{post.title} ({post.subject_name})</Text>
                <Text><Text style={styles.strong}>Posted:</Text> {postDate} by {post.posted_by}</Text>
                { dueDate !== ''
                  ? <Text><Text style={styles.strong}>Due:</Text> <Text style={styles.highlight}>{dueDate}</Text></Text>
                  : null
                }
                { showAttachment
                  ? <TouchableHighlight onPress={this.downloadFile.bind(this, downloadUrl) }>
                      <View style={styles.attachment}>
                        <Icon style={styles.attachmentIcon} name='md-attach' />
                        <Text style={styles.strong}>Attachment:</Text>
                        <Text style={styles.link}>Homework file</Text>
                      </View>
                    </TouchableHighlight>
									: null
								}
							</View>
              <WebView
                scrollEnabled={false}
                source={{html:html+style+script}}
                style={{height:this.state.height}}
                javaScriptEnabled ={true}
                onNavigationStateChange={this.onNavigationChange.bind(this)}>
              </WebView>
            </View>
            )
          })
      	: <View>
	          <Text style={styles.newsNote}>There is currently no homework.</Text>
	        </View>
			}
			</Content>
    )
  }
}
