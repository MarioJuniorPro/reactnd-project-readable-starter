import React from 'react'
import PropTypes from 'prop-types'

import FaUser from 'react-icons/lib/fa/user'

import CommentCount from './CommentCount'
import PostCardShortDescription from './PostCardShortDescription'
import PostCardTitle from './PostCardTitle'
import PostCardAuthor from './PostCardAuthor'

export const PostCardInfo = (props) => {
  const { commentCount, body, title, author }  = props.post
  return (
    <div className="posts-card__info-container">
      <PostCardTitle title={title} />
      <PostCardAuthor author={author} />
      <PostCardShortDescription description={body} />
      <CommentCount count={commentCount}/>
    </div>
  )
}

PostCardInfo.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostCardInfo
