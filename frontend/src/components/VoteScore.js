import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { upVotePost, downVotePost } from '../store/ducks/posts'

import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'

const getVoteScoreClassName = (voteScore) => {
    return voteScore < 0 ? 'vote-score__counter--negative' : 'vote-score__counter--positive'
}

export const VoteScore = props => {
  const { voteScore, id } = props.post
  return (
    <div className="vote-score">
      <button className="btn-round vote-score__button--increase" title="Up" onClick={() => {props.upVotePost(id)}}>
        <FaThumbsUp />
      </button>
      <span className={`vote-score__counter ${getVoteScoreClassName(voteScore)}`}>{voteScore}</span>
      <button className="btn-round vote-score__button--decrease" title="Down" onClick={() => {props.downVotePost(id)}}>
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

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  upVotePost, downVotePost
}


export default connect(mapStateToProps, mapDispatchToProps)(VoteScore)
