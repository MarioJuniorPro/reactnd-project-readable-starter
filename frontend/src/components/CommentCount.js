import React from 'react'
import PropTypes from 'prop-types'
import FaComment from 'react-icons/lib/fa/comments'

export const CommentCount = (props) => {
  const commentCount = props.count
  const commentCountSumary = commentCount.length === 1 ? `${commentCount} comment` : `${commentCount} comments`
  return (
    <span className="posts-card__comments-count"><FaComment className="posts-card__comments-icon" />{commentCountSumary}</span>
  )
}

CommentCount.displayName = 'CommentCount'

CommentCount.propTypes = {
  count: PropTypes.number.isRequired
}

CommentCount.defaultProps = {
  count: 0
}

export default CommentCount
