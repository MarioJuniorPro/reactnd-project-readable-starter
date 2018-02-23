import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Simplert from 'react-simplert'

import { Card, Icon, Grid, Dropdown } from 'semantic-ui-react'

import VoteScore from './VoteScore'
import CommentCount from './CommentCount'
import PostCardTitle from './PostCardTitle'
import PostCardAuthor from './PostCardAuthor'
import PostModal from './PostModal'

import PostFormEdit from './PostFormEdit'

import postShape from './post.shape'
import { deletePost, upVotePost, downVotePost } from '../store/ducks/posts'

export class PostCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promptDelete: false,
      showPostForm: false
    }
  }

  static propTypes = {
    post: PropTypes.shape(postShape)
  }

  static defaultProps = {
    post: {
      body: ''
    }
  }

  promptDelete = () => {
    this.setState({ promptDelete: true })
  }

  promptDeleteClose = () => {
    this.setState({ promptDelete: false })
  }

  showPostForm = () => {
    this.setState(state => {
      return {...state, showPostForm: !state.showPostForm }
    })
  }

  showPostFormClose = () => {
    this.setState({ showPostForm: false })
  }

  deletePostById = () => {
    this.props.deletePost(this.props.post.id)
    this.setState({ promptDelete: false })
  }

  render() {
    const { commentCount, body, title, author, category, id, voteScore } = this.props.post
    const shortDescription =
      body && body.length > 140 ? `${body.substring(0, 140)}...` : body

    return (
      <Fragment>
        <PostFormEdit onClose={this.showPostFormClose} show={this.state.showPostForm} post={this.props.post}/>
        <Card fluid color={voteScore > 0? 'green': 'red'}>
          <Card.Content>
            <Card.Header>
              <PostCardTitle title={title} category={category} id={id} />
            </Card.Header>
            <Card.Meta>{category}</Card.Meta>
            <Card.Description>{shortDescription}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Grid>
              <Grid.Row>
                <Grid.Column width={6}>
                  <VoteScore
                    voteScore={voteScore}
                    upVote={() => this.props.upVotePost(id)}
                    downVote={() => this.props.downVotePost(id)}
                  />
                </Grid.Column>
                <Grid.Column width={3}>
                  <PostCardAuthor author={author} />
                </Grid.Column>
                <Grid.Column width={6}>
                  <CommentCount count={commentCount} />
                </Grid.Column>
                <Grid.Column width={1}>
                  <Dropdown
                    item
                    icon="options"
                    simple
                    className="post__settings"
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={this.showPostForm}
                        className="post__settings-edit"
                      >
                        <Icon color="grey" name="pencil" />Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={this.promptDelete}
                        className="post__settings-delete"
                      >
                        <Icon color="red" name="trash" />Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
        <Simplert
          title={'Delete Post'}
          message={'Are you sure about deliting this post?'}
          showSimplert={this.state.promptDelete}
          onClose={this.promptDeleteClose}
          type={'warning'}
          onConfirm={this.deletePostById}
          customClass="post__delete-confirm"
          useConfirmBtn={true}
        />
        {/* <PostModal isOpen={this.state.promptPostModal} onClose={this.promptPostModalClose} editMode={true}/> */}
      </Fragment>
    )
  }
}

const mapDispatchToProps = {
  deletePost,
  upVotePost,
  downVotePost
}

export default connect(null, mapDispatchToProps)(PostCard)
