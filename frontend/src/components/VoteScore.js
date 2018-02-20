import React from 'react'
import PropTypes from 'prop-types'

export const VoteScore = (props) => {
  const { voteScore } = props.post
  return (
    <div className="vote-score">
      <button className="vote-score__increase" title="Up">
        &uarr;
      </button>
      <span className="vote-score__counter">{voteScore}</span>
      <button className="vote-score__decrease" title="Down">
        &darr;{' '}
      </button>
    </div>
  )
}

VoteScore.propTypes = {
  post: PropTypes.shape({ id: PropTypes.string, voteScore: PropTypes.number })
    .isRequired
}

export default VoteScore
