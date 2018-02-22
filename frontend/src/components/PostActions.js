import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Simplert from 'react-simplert'

import { deletePost } from '../store/ducks/posts'
import FaDelete from 'react-icons/lib/fa/trash'
import FaEdit from 'react-icons/lib/fa/edit'

export class PostActions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      promptDelete: false
    }
  }

  promptDelete = () => {
    this.setState({ promptDelete: true })
  }

  promptDeleteClose = () => {
    this.setState({ promptDelete: false })
  }

  detelePost = () => {
    this.props.deletePost(this.props.id)
    this.setState({ promptDelete: false })
  }

  render() {
    return (
      <div style={{ position: 'absolute', right: 15 }}>
        <FaEdit />
        <button onClick={this.promptDelete}>
          <FaDelete />
        </button>
        <Simplert
          title={'Delete Post'}
          message={'Are you sure about deliting this post?'}
          showSimplert={this.state.promptDelete}
          onClose={this.promptDeleteClose}
          type={'warning'}
          onConfirm={this.detelePost}
          useConfirmBtn={true}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostActions)
