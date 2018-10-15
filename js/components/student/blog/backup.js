import React, { Component } from 'react';
import {
  Image,
  ListView,
  WebView,
  ActivityIndicator,
  RefreshControl,
  Text,
  ScrollView } from 'react-native';
import { Content, View } from 'native-base';
import styles from './styles';
import moment from 'moment';

const PULLDOWN_DISTANCE = 40;

const LoadingIndicator = ({ loading }) => (
  loading ? (
    <View style={ styles.loading }>
      <ActivityIndicator
        animating={ true }
        style={[ styles.loading ]}
        size="large"
      />
    </View>
  ) : null
);

const script = `
<script>
	window.location.hash = 1;
    var calculator = document.createElement("div");
    calculator.id = "height-calculator";
    while (document.body.firstChild) {
        calculator.appendChild(document.body.firstChild);
    }
	document.body.appendChild(calculator);
  document.title = calculator.scrollHeight + 15;
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
    border:1px solid red;
    line-height:24px;
}
</style>
`;

export default class PostsTab extends Component {
  static propTypes = {
    posts: React.PropTypes.array,
    pagination: React.PropTypes.object,
    school: React.PropTypes.string,
    fetchStudentBlog: React.PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      pagination: {},
      posts: [],
      ds: new ListView.DataSource({ rowHasChanged: this._rowHasChanged }),
      height:0
    }
  }

  componentWillMount() {
    this._getPosts(1)
  }

  _getPostsRequest() {
    const pagination = { ...this.state.pagination, loading: true }
    this._update(pagination, this.state.posts)
  }

  _getPostsSuccess(result) {
    const pagination = { ...result.pagination, loading: false }
    const posts = pagination.page === 1 ? result.posts : [ ...this.state.posts, ...result.posts ]

    this._update(pagination, posts)
  }

  _getPostsFailure(error) {
    const pagination = { ...this.state.pagination, loading: false }
    this._update(pagination, this.state.posts)
    console.error(error)
  }

  _getPosts(page) {
    this._getPostsRequest();
    this.props.fetchStudentBlog(this.props.school, this.props.studentId, page)
      .then( (resp) => {
        let result = {
          pagination: this.props.pagination,
          posts: this.props.posts
        }
        this._getPostsSuccess(result)
      })
      .catch(error => this._getPostsFailure(error))

  }

  _rowHasChanged(r1, r2) {
    return r1 !== r2
  }

  _update(pagination, posts) {
    const loading = {
      type: 'Loading',
      loading: pagination.loading
    }
    this.setState({
      pagination: pagination,
      posts: posts,
      ds: this.state.ds.cloneWithRows([ ...posts, loading ])
    })
  }

  _renderRow(row) {
    if (row.type === 'Loading') {
      return <LoadingIndicator loading={ row.loading } />
    } else {
      const html = this._truncateBody(row.body);
      const postDate = moment(row.creation_date).format('MMM D, YYYY');

      return (
        <View style={styles.blogEntry} key={row.post_id}>
          {
            row.feature_image
            ? <Image style={styles.picContainer}
                source={{uri: `http://${this.props.school}.eduweb.co.ke/assets/posts/${row.feature_image}`}} />
            : ''
          }
          <Text style={styles.heading}>{row.title}</Text>
          <Text style={styles.published}>{row.posted_by} {postDate}</Text>
          <WebView
            scrollEnabled={false}
            source={{html:html+style+script}}
            style={{height:this.state.height}}
            javaScriptEnabled={true}
            onNavigationStateChange={this._onNavigationChange.bind(this)}>
          </WebView>
        </View>
      )
    }
  }

  _onRefresh() {
    this._getPosts(1)
  }

  _onEndReached() {
    const { pagination } = this.state
    const { page, perPage, pageCount, totalCount } = pagination
    const lastPage = totalCount <= (page - 1) * perPage + pageCount

    if (!pagination.loading && !lastPage ) {
      this._getPosts(page + 1)
    }
  }

  _onNavigationChange(event) {
    if (event.title) {
      const htmlHeight = Number(event.title) || 0; //convert to number
      this.setState({height:htmlHeight});
    }
  }

  _truncateBody(body) {
    const maxLen = 150;
    if (body.length > 150) {
      body = body.substring(0,maxLen) + '...</div>';
    }
    return body;
  }

  render() {
    return (
      <Content padder>
        <ListView
          style={styles.blogContainer}
          enableEmptySections={ true }
          automaticallyAdjustContentInsets={ false }
          dataSource={ this.state.ds }
          renderRow={ row => this._renderRow(row) }
          refreshControl={
            <RefreshControl
              refreshing={ false }
              onRefresh={ () => this._onRefresh() }
            />
          }
          onEndReached={ () => this._onEndReached() }
          onEndReachedThreshold={PULLDOWN_DISTANCE}
        />
      </Content>
    )
  }
}
