import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Simplert from 'react-simplert'

import {
  Card,
  Icon,
  Grid,
  Dropdown,
  
} from 'semantic-ui-react'

import VoteScore from './VoteScore'
import CommentCount from './CommentCount'
import PostCardTitle from './PostCardTitle'
import PostCardAuthor from './PostCardAuthor'

import { deletePost } from '../store/ducks/posts'

export class PostCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promptDelete: false
    }
  }
  
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  static defaultProps = {
    post: {}
  }


  promptDelete = () => {
    this.setState({ promptDelete: true })
  }

  promptDeleteClose = () => {
    this.setState({ promptDelete: false })
  }

  detelePost = (id) => {
    this.props.deletePost(id)
    this.setState({ promptDelete: false })
  }

  render() {
    const { commentCount, body, title, author, category, id } = this.props.post
    const shortDescription =
      body.length > 140 ? `${body.substring(0, 140)}...` : body

    return (
      <Fragment>
      <Card fluid color="green">
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
                <VoteScore post={this.props.post} />
              </Grid.Column>
              <Grid.Column width={3}>
                <PostCardAuthor author={author} />
              </Grid.Column>
              <Grid.Column width={6}>
                <CommentCount count={commentCount} />
              </Grid.Column>
              <Grid.Column width={1}>
                <Dropdown item icon="options" simple>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Icon color="grey" name="pencil" />Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.promptDelete} >
                      <Icon color="red" name="trash"  />Delete
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
        onConfirm={() => this.detelePost(id)}
        useConfirmBtn={true}
      />

      </Fragment>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCard)
