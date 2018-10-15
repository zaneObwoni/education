import React, { Component } from 'react';
import { Image, WebView, Text, View, TouchableOpacity } from 'react-native';
import { Content, Spinner } from 'native-base';
import styles from './styles';
import moment from 'moment';

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

export default class PostsTab extends Component {
  static propTypes = {
    posts: React.PropTypes.array,
    school: React.PropTypes.string,
		studentId: React.PropTypes.number,
		fetchStudentBlog: React.PropTypes.func,
		pagination: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
       height:0,
       page: 1,
       pagination: this.props.pagination,
       posts: this.props.posts
    };
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

  _update(pagination, posts) {
    const loading = {
      type: 'Loading',
      loading: pagination.loading
    }
    this.setState({
      pagination: pagination,
      posts: posts,
      //ds: this.state.ds.cloneWithRows([ ...posts, loading ])
    })
  }

  loadMorePosts() {
    let page = this.state.pagination.page + 1;
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

  onNavigationChange(event) {
    if (event.title) {
      const htmlHeight = Number(event.title) || 0; //convert to number
      this.setState({height:htmlHeight});
    }
  }

  render() {
    const posts = this.state.posts;
    const blogName = posts.length > 0 ? posts[0].blog_name : '';
    const pagination = this.state.pagination;

    return (
        <Content padder>
          <Text style={styles.heading}>{blogName}</Text>
          {
            posts.length > 0
            ? posts.map((post) => {
                let html = post.body;
                const postDate = moment(post.creation_date).format('MMM D, YYYY');
                return (
                <View style={styles.blogEntry} key={post.post_id}>
                  {
                    post.feature_image
                    ? <Image style={styles.picContainer}
                        source={{uri: `http://${this.props.school}.eduweb.co.ke/assets/posts/${post.feature_image}`}} />
                    : null
                  }
                  <Text style={styles.blogTitle}>{post.title}</Text>
                  <Text style={styles.published}>{post.posted_by} {postDate}</Text>

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
              <Text style={styles.newsNote}>There are currently no posts.</Text>
            </View>
        }
        {
          pagination.totalCount > pagination.page * pagination.perPage
          ? pagination.loading
            ? <View><Spinner color='green' /></View>
            : <TouchableOpacity
                onPress={this.loadMorePosts.bind(this)}
                style={styles.moreBtn}>
                <Text style={styles.moreBtnText}>Load More</Text>
              </TouchableOpacity>
          : null
        }
        </Content>

    )
  }
}
