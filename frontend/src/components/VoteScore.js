import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { upVotePost, downVotePost } from '../store/ducks/posts'

import { Icon, Button } from 'semantic-ui-react'

export const VoteScore = props => {
  const { voteScore, id } = props.post
  return (
    <div className="vote-score">
      <Button.Group size="mini">
        <Button
          negative
          title="Down"
          onClick={() => {
            props.downVotePost(id)
          }}
          className="vote-score__button--decrease"
        >
          <Icon name="thumbs down outline" />
        </Button>
        <Button.Or text={voteScore} className="vote-score__counter"/>
        <Button
          positive
          title="Up"
          onClick={() => {
            props.upVotePost(id)
          }}
          className="vote-score__button--increase"
        >
          <Icon name="thumbs up outline" />
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
