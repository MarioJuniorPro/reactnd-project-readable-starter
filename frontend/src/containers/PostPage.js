import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Header,Dimmer,Loader } from 'semantic-ui-react'

import { fetchPost } from '../store/ducks/posts'

import DefaultLayout from './DefaultLayout'
import NotFound from './NotFound'

export class Post extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired
  }

  componentWillMount(){
    this.props.fetchPost(this.props.postId)
  }

  renderNotFound(){
    const { post } = this.props
    return !post && !this.props.isFetching ? <NotFound />: null
  }

  render() {
    const { post } = this.props
    
    return (
      <DefaultLayout>
        <Dimmer active={this.props.isFetching}inverted>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
        <Container text style={{ marginTop: '5rem' }}>
          { this.renderNotFound() }
          <Header>POST {this.props.postId}</Header>
        </Container>
      </DefaultLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.posts.activePost,
  isFetching: state.posts.isFetching
})

const mapDispatchToProps = {
  fetchPost
}


export default connect(mapStateToProps, mapDispatchToProps)(Post)
