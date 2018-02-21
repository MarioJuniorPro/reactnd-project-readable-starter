import React from 'react'
import PropTypes from 'prop-types'

export const PostCardTitle = props => {
  const { title } = props
  return (
    <span className="posts-card__title">
      <a href="#" className="posts-card__link">
        {title}
      </a>
    </span>
  )
}

PostCardTitle.displayName = 'PostCardTitle'

PostCardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string
}

export default PostCardTitle
