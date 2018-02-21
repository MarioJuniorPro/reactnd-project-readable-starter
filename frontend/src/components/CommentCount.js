import React from 'react'
import PropTypes from 'prop-types'

export const CommentCount = (props) => {
  const commentCount = props.count
  const commentCountSumary = commentCount.length === 1 ? `${commentCount} comment` : `${commentCount} comments`
  return (
    <span className="posts-card__comments-count">{commentCountSumary}</span>
  )
}

CommentCount.propTypes = {
  count: PropTypes.number.isRequired
}

CommentCount.defaultProps = {
  count: 0
}

export default CommentCount
