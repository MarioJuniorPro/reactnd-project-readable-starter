import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { upVotePost, downVotePost } from '../store/ducks/posts'

import { Icon, Button } from 'semantic-ui-react'

const getVoteScoreClassName = voteScore => {
  return voteScore < 0
    ? 'vote-score__counter--negative'
    : 'vote-score__counter--positive'
}

export const VoteScore = props => {
  const { voteScore, id } = props.post
  return (
    <div className="vote-score">
      {/* <button
        className="btn-round vote-score__button--increase"
        title="Up"
        onClick={() => {
          props.upVotePost(id)
        }}
      >
        <Icon color="green" name="thumbs up outline" bordered inverted/>
      </button>
      <span
        className={`vote-score__counter ${getVoteScoreClassName(voteScore)}`}
      >
        {voteScore}
      </span>
      <button
        className="btn-round vote-score__button--decrease"
        title="Down"
        onClick={() => {
          props.downVotePost(id)
        }}
      >
       <Icon color='red' name='thumbs down outline' circular inverted />

      </button> */}
      <Button.Group size="mini">
        <Button
          negative
          title="Down"
          onClick={() => {
            props.downVotePost(id)
          }}
        >
          <Icon color="white" name="thumbs down outline" />
        </Button>
        <Button.Or text={voteScore} positive/>
        <Button
          positive
          title="Up"
          onClick={() => {
            props.upVotePost(id)
          }}
        >
          <Icon color="white" name="thumbs up outline" />
        </Button>
      </Button.Group>
    </div>
  )
}

VoteScore.displayName = 'VoteScore'

VoteScore.propTypes = {
  post: PropTypes.shape({ id: PropTypes.string, voteScore: PropTypes.number })
    .isRequired
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  upVotePost,
  downVotePost
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore)
