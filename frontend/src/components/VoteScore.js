import React from 'react'
import PropTypes from 'prop-types'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'

export const VoteScore = props => {
  const { voteScore } = props.post
  return (
    <div className="vote-score">
      <button className="vote-score_button vote-score__increase" title="Up">
        <FaThumbsUp />
      </button>
      <span className="vote-score__counter">{voteScore}</span>
      <button className="vote-score_button vote-score__decrease" title="Down">
        <FaThumbsDown />
      </button>
    </div>
  )
}

VoteScore.displayName = 'VoteScore'

VoteScore.propTypes = {
  post: PropTypes.shape({ id: PropTypes.string, voteScore: PropTypes.number })
    .isRequired
}

export default VoteScore
