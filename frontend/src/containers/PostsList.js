import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { getPosts, getVisiblePosts } from '../store/ducks/posts'

import PostCard from '../components/PostCard'
import PostsCategories from '../components/PostsCategories'

export class PostsList extends Component {

  static defaultProps = {
    posts: []
  }

  componentDidMount(){
    this.props.getPosts(this.props.category)
  }

  componentWillReceiveProps(newProps){
    this.props.category !== newProps.category ? this.props.getPosts(newProps.category) : null
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
  posts: getVisiblePosts(state.posts.list, props.category)
})

const mapDispatchToProps = {
  getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
