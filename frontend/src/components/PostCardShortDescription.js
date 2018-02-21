import React from 'react'
import PropTypes from 'prop-types'

export const PostCardShortDescription = (props) => {
  const { description, maxCharacters, ending}  = props
  const shortDescription = description.length > maxCharacters ? `${description.substring(0, maxCharacters)}${ending}` : description
  return (
      <span className="posts-card__short-description">
        {shortDescription}
      </span>
  )
}

PostCardShortDescription.propTypes = {
  description: PropTypes.string.isRequired,
  maxCharacters: PropTypes.number.isRequired,
  ending: PropTypes.string
}

PostCardShortDescription.defaultProps = {
  description: '',
  maxCharacters: 140,
  ending: '...'
}

export default PostCardShortDescription
