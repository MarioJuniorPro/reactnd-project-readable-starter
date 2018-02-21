import React from 'react'
import PropTypes from 'prop-types'

import CommentCount from './CommentCount'
import PostCardBody from './PostCardBody'
import PostCardTitle from './PostCardTitle'
import PostCardAuthor from './PostCardAuthor'

export const PostCardInfo = (props) => {
  const { commentCount, body, title, author }  = props.post
  return (
    <div className="posts-card__info-container">
      <PostCardTitle title={title} />
      <div style={{position: 'absolute', right: 15}}>sss</div>
      <PostCardBody body={body} maxCharacters={140} />
      <footer className="posts-card__footer">
        <PostCardAuthor author={author} />
        <CommentCount count={commentCount}/>
        <span className="posts-card__actions">Edit / Delete</span>
      </footer>
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

PostCardInfo.displayName = 'PostCardInfo'

export default PostCardInfo
