import React from 'react'
import PropTypes from 'prop-types'

import VoteScore from './VoteScore'
import PostCardInfo from './PostCardInfo'

export const PostCard = (props) => {
  return (
    <article className="posts-card">
      <VoteScore post={props.post} />   
      <PostCardInfo post={props.post} />
    </article>
  )
}

PostCard.displayName = 'PostCard'

PostCard.propTypes = {
  post: PropTypes.object.isRequired
}

PostCard.defaultProps = {
  post: {}
}

export default PostCard
