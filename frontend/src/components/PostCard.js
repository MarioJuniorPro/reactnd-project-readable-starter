import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Button,
  Icon,
  Input,
  Grid,
  Divider,
  Statistic,
  Dropdown,
  Menu,
  Segment
} from 'semantic-ui-react'

import VoteScore from './VoteScore'
// import PostCardInfo from './PostCardInfo'
import CommentCount from './CommentCount'
import PostCardBody from './PostCardBody'
import PostCardTitle from './PostCardTitle'
import PostCardAuthor from './PostCardAuthor'
// import PostActions from './PostActions'

import { deletePost } from '../store/ducks/posts'

export const PostCard = props => {
  const { commentCount, body, title, author, category, id } = props.post
  const shortDescription =
    body.length > 140 ? `${body.substring(0, 140)}...` : body
  return (
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
              <VoteScore post={props.post} />
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
                  <Dropdown.Item><Icon color='grey' name='pencil' />Edit</Dropdown.Item>
                  <Dropdown.Item><Icon color='red' name='trash' />Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

PostCard.displayName = 'PostCard'

PostCard.propTypes = {
  post: PropTypes.object.isRequired
}

PostCard.defaultProps = {
  post: {}
}

export default PostCard
