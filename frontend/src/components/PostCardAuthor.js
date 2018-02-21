import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import FaUser from 'react-icons/lib/fa/user'

export const PostCardAuthor = props => {
  const { author } = props
  return (
    <span className="posts-card__author">
      <FaUser className="posts-card__author-icon" />
      {author}
    </span>
  )
}

PostCardAuthor.displayName = 'PostCardAuthor'

PostCardAuthor.propTypes = {
  author: PropTypes.string.isRequired
}

PostCardAuthor.defaultProps = {
  author: 'Unknown'
}

export default PostCardAuthor
