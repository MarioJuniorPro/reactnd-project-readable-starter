import React from 'react'
import PropTypes from 'prop-types'

export const PostCardBody = (props) => {
  const { body, maxCharacters, ending}  = props
  const shortDescription = body.length > maxCharacters ? `${body.substring(0, maxCharacters)}${ending}` : body
  return (
      <span className="posts-card__short-description">
        {shortDescription}
      </span>
  )
}

PostCardBody.displayName = 'PostCardShortDescription'

PostCardBody.propTypes = {
  body: PropTypes.string.isRequired,
  // maxCharacters: PropTypes.number.isRequired,
  ending: PropTypes.string
}

PostCardBody.defaultProps = {
  body: '',
  maxCharacters: undefined,
  ending: '...'
}

export default PostCardBody
