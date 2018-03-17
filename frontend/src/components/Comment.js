import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Comment as SemaComment,
  Button,
  Form
} from 'semantic-ui-react'

import { upVoteComment, downVoteComment } from '../store/ducks/comments'

import VoteScore from './VoteScore'
import TimeAgo from './TimeAgo'


export class Comment extends Component  {
  constructor(){
    super()
    this.state = {
      editing: false
    }
  }
  
  render(){
    const { id, voteScore, author, body, timestamp } = this.props.comment
    return (
      <SemaComment>
        <SemaComment.Avatar as="div" src="/user.jpg" />
        <SemaComment.Content>
          <SemaComment.Author>{author}</SemaComment.Author>
          <SemaComment.Metadata>
            <TimeAgo time={timestamp} />
          </SemaComment.Metadata>
          <SemaComment.Text>
            <p>
              {body}
            </p>
          </SemaComment.Text>
          <SemaComment.Actions>
            <SemaComment.Action><VoteScore
              voteScore={voteScore}
              upVote={() => this.props.upVoteComment(id)}
              downVote={() => this.props.downVoteComment(id)}
            /></SemaComment.Action>
          </SemaComment.Actions>
          {this.state.editing && (
          <Form reply onSubmit={null}>
            <Form.TextArea onChange={null} autoHeight={true} value={null}/>
            <Form.Group>
                <Form.Button onClick={null}>Cancel</Form.Button>
                <Form.Button color="green" onClick={null}>
                  Update
                </Form.Button>
              </Form.Group>
          </Form>)
          }
        </SemaComment.Content>
      </SemaComment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  upVoteComment, downVoteComment
}


export default connect(null, mapDispatchToProps)(Comment)