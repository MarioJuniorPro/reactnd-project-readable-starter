import React from 'react'
import PropTypes from 'prop-types'

import FaUser from 'react-icons/lib/fa/user'

import CommentCount from './CommentCount'
import PostCardBody from './PostCardBody'
import PostCardTitle from './PostCardTitle'
import PostCardAuthor from './PostCardAuthor'

export const PostCardInfo = (props) => {
  const { commentCount, body, title, author }  = props.post
  return (
    <div className="posts-card__info-container">
      <PostCardTitle title={title} />
      <PostCardAuthor author={author} />
      <PostCardBody body={body} maxCharacters={140} />
      <CommentCount count={commentCount}/>
    </div>
  )
}

PostCardInfo.propTypes = {
  post: PropTypes.shape({ 
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    commentCount: PropTypes.number })
    .isRequired
}

export default PostCardInfo
