import React from 'react'
import PropTypes from 'prop-types'

import CommentCount from './CommentCount'
import PostCardShortDescription from './PostCardShortDescription'

export const PostCardInfo = (props) => {
  const { commentCount, body }  = props.post
  return (
    <div className="posts-card__info-container">
      <span className="posts-card__title">
        <a href="#" className="posts-card__link">
          Learn Redux in 10 minutes!
        </a>
      </span>
      <span className="posts-card__author">Author: Necrower</span>
      <PostCardShortDescription description={body} />
      <CommentCount count={commentCount}/>
    </div>
  )
}

PostCardInfo.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostCardInfo
