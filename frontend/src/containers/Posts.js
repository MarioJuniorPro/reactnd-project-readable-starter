import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import * as postsDuck from '../store/ducks/posts'

import PostCard from '../components/PostCard'
import PostsCategories from '../components/PostsCategories'

export class PostsList extends Component {

  static defaultProps = {
    posts: []
  }

  componentDidMount(){
    this.props.fetchPosts(this.props.category)

    setInterval(() => {
      this.props.upVotePost("8xf0y6ziyjabvozdd253nd")
    }, 20 * 1000)
    
  }

  componentWillReceiveProps(newProps){
    this.props.category !== newProps.category ? this.props.fetchPosts(newProps.category) : null
  }

  render() {
    return (
      <Fragment>
        <PostsCategories />
        <section className="posts-cards">
          {this.props.posts.map(post => <PostCard key={post.id} post={post} />)}
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
  posts: postsDuck.getVisiblePosts(state.posts.list, props.category)
})

const mapDispatchToProps = {
  fetchPosts: postsDuck.fetchPosts,
  upVotePost: postsDuck.upVotePost,
  downVote: postsDuck.downVotePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
