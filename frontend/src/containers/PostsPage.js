import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card,Dimmer,Loader } from 'semantic-ui-react'

import * as postsDuck from '../store/ducks/posts'
import * as categoriesDuck from '../store/ducks/categories'

import PostCard from '../components/PostCard'

import PostsCategoriesMenu from '../components/PostsCategoriesMenu'


import DefaultLayout from './DefaultLayout'

export class PostsList extends Component {

  componentWillMount() {
    this.props.fetchCategories()
    this.props.fetchPosts(this.props.category)

    setInterval(() => {
      this.props.upVotePost('8xf0y6ziyjabvozdd253nd')
    }, 20 * 1000)
  }

  componentWillReceiveProps(newProps) {
    this.props.category !== newProps.category &&
      this.props.fetchPosts(newProps.category)
  }

  render() {
    return (
      <div>
        <DefaultLayout>
          <Dimmer active={this.props.isFetching}inverted>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
          <Container text style={{ marginTop: '5rem' }}>
            <PostsCategoriesMenu
              categories={this.props.categories}
              category={this.props.category}
            />
            <Card.Group>
              {this.props.posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </Card.Group>
          </Container>
        </DefaultLayout>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  posts: postsDuck.getSortedAndVisiblePosts(state.posts, props.category),
  categories: state.categories.list,
  isFetching: state.posts.isFetching
})

const mapDispatchToProps = {
  fetchPosts: postsDuck.fetchPosts,
  upVotePost: postsDuck.upVotePost,
  downVote: postsDuck.downVotePost,
  fetchCategories: categoriesDuck.fetchCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
