import React from 'react'
import PropTypes from 'prop-types'

import CommentCount from './CommentCount'
import PostCardBody from './PostCardBody'
import PostCardTitle from './PostCardTitle'
import PostCardAuthor from './PostCardAuthor'
import PostActions from './PostActions'

export const PostCardInfo = (props) => {
  const { commentCount, body, title, author,category, id }  = props.post
  return (
    <div className="posts-card__info-container">
      <PostCardTitle title={title} category={category} id={id}/>
      <PostActions />
      <PostCardBody body={body} maxCharacters={140} />
      <footer className="posts-card__footer">
        <PostCardAuthor author={author} />
        <CommentCount count={commentCount}/>
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
