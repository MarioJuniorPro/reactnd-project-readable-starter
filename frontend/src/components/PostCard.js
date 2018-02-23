import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Simplert from 'react-simplert'

import { Card, Icon, Grid, Dropdown } from 'semantic-ui-react'

import VoteScore from './VoteScore'
import CommentCount from './CommentCount'
import PostCardTitle from './PostCardTitle'
import PostCardAuthor from './PostCardAuthor'

import postShape from './post.shape'
import { deletePost, upVotePost, downVotePost } from '../store/ducks/posts'

export class PostCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promptDelete: false
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

  deletePostById = () => {
    this.props.deletePost(this.props.post.id)
    this.setState({ promptDelete: false })
  }

  toPostPage = () => {
    const { category, id } = this.props.post
    this.props.history.push(`/${category}/${id}`)
  }

  render() {
    const { commentCount, body, title, author, category, id, voteScore } = this.props.post
    const shortDescription =
      body && body.length > 140 ? `${body.substring(0, 140)}...` : body

    return (
      <Fragment>
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
                        onClick={() => this.toPostPage(id)}
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
      </Fragment>
    )
  }
}

const mapDispatchToProps = {
  deletePost,
  upVotePost,
  downVotePost
}

export default withRouter(connect(null, mapDispatchToProps)(PostCard))
