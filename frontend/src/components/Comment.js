import React from 'react'

import {
  Comment as SemaComment,
  Button
} from 'semantic-ui-react'

import {
} from '../store/ducks/posts'

import VoteScore from './VoteScore'

export const Comment =  () => {
  return (
    <SemaComment>
      <SemaComment.Avatar as="a" src="/user.jpg" />
      <SemaComment.Content>
        <SemaComment.Author>Joe Henderson</SemaComment.Author>
        <SemaComment.Metadata>
          <div>1 day ago</div>
        </SemaComment.Metadata>
        <SemaComment.Text>
          <p>
            The hours, minutes and seconds stand as visible reminders that
            your effort put them all there.
          </p>
          <p>
            Preserve until your next run, when the watch lets you see how
            Impermanent your efforts are.
          </p>
          
        </SemaComment.Text>
        <SemaComment.Actions>
          <SemaComment.Action><VoteScore
            voteScore={0}
            upVote={() => this.props.upVotePost('')}
            downVote={() => this.props.downVotePost('')}
          /></SemaComment.Action>
        </SemaComment.Actions>
      </SemaComment.Content>
    </SemaComment>
  )
}

export default Comment