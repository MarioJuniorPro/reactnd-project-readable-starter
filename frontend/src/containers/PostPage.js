import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  Container,
  Header,
  Dimmer,
  Loader,
  Card,
  Icon,
  Form,
  Grid,
  Dropdown,
  Comment as SemaComment,
  Button
} from 'semantic-ui-react'

import { fetchPost } from '../store/ducks/posts'
import { fetchComments, getComments, createComment } from '../store/ducks/comments'

import PostCard from '../components/PostCard'
import Comment from '../components/Comment'

import DefaultLayout from './DefaultLayout'
import NotFound from './NotFound'

export class PostPage extends Component {

  constructor(){
    super()

    this.state = {
      commentText: ''
    }
  }
  static propTypes = {
    category: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired
  }

  componentWillMount() {
    this.props.fetchPost(this.props.postId)
    this.props.fetchComments(this.props.postId)
  }

  renderNotFound() {
    const { post } = this.props
    return !post && !this.props.isFetching ? <NotFound /> : null
  }

  render() {
    const { post } = this.props

    return (
      <DefaultLayout>
        <Dimmer active={this.props.isFetching} inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>

        <Container text style={{ marginTop: '5rem' }}>
          {this.renderNotFound()}
          {post && this.renderContent()}
        </Container>
      </DefaultLayout>
    )
  }

  createComment = (e) => {
    const timestamp = moment()
    const comment = {
      id: timestamp,
      timestamp: timestamp,
      body: this.state.commentText.trim(),
      author: 'Annon',
      parentId: this.props.postId
    }
   
    this.props.createComment(comment)
    this.setState({commentText: ''})
  }

  handleCommentChange = (e) => {
    this.setState({commentText: e.target.value})
  }

  renderContent() {
    const post = {...this.props.post, commentCount: this.props.comments.length}

    return (
      <Fragment>
        <SemaComment.Group>
          <PostCard key={post.id} post={post} />
        </SemaComment.Group>
        <SemaComment.Group>
          { this.props.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
          <Form reply onSubmit={this.createComment}>
            <Form.TextArea onChange={this.handleCommentChange} autoHeight={true}/>
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </SemaComment.Group>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
  post: state.posts.activePost,
  isFetching: state.posts.isFetching,
  comments: getComments(state.comments, props.postId)
})

const mapDispatchToProps = {
  fetchPost,
  fetchComments,
  createComment
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
