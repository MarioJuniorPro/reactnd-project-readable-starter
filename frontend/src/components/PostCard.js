import React from 'react'
import PropTypes from 'prop-types'

import VoteScore from './VoteScore'

export const PostCard = (props) => {
  console.log(props.post)
  return (
    <article className="posts-card">
      <VoteScore post={props.post} />   

        <div className="posts-card__info-container">
        <span className="posts-card__title">
          <a href="#" className="posts-card__link">Learn Redux in 10 minutes!</a>
        </span>
        <span className="posts-card__author">Author: Necrower</span>
        <span className="posts-card__short-description">Just kidding. It takes more than 10 minutes to learn technology.</span>
        <span className="posts-card__comments-count">7 comments</span>              
      </div>
    </article>
  )
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostCard
