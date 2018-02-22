import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import * as postsDuck from '../store/ducks/posts'
import * as categoriesDuck from '../store/ducks/categories'

import PostCard from '../components/PostCard'
import PostsCategoriesMenu from '../components/PostsCategoriesMenu'

import _ from 'lodash'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Card,
  Button,
  Icon,
  Input
} from 'semantic-ui-react'

import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'

export class PostsList extends Component {
  static defaultProps = {
    posts: []
  }

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPosts(this.props.category)

    setInterval(() => {
      this.props.upVotePost('8xf0y6ziyjabvozdd253nd')
    }, 20 * 1000)
  }

  componentWillReceiveProps(newProps) {
    this.props.category !== newProps.category
      ? this.props.fetchPosts(newProps.category)
      : null
  }

  render() {
    return (
      <div>
        <Container textAlign={'center'}>
          <DefaultHeader />
        </Container>

        <Container text style={{ marginTop: '5rem' }}>
          <PostsCategoriesMenu categories={this.props.categories} category={this.props.category}/>

          {/* <Header as="h1">Semantic UI React Fixed Template</Header>
          <p>
            This is a basic fixed menu template using fixed size containers.
          </p>
          <p>
            A text container is used for the main container, which is useful for
            single column layouts.
          </p> */}
          
          <Card.Group>
            {this.props.posts.map(post => <PostCard key={post.id} post={post} />)}
          </Card.Group>
        </Container>

        <DefaultFooter />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  posts: postsDuck.getVisiblePosts(state.posts.list, props.category),
  categories: state.categories.list
})

const mapDispatchToProps = {
  fetchPosts: postsDuck.fetchPosts,
  upVotePost: postsDuck.upVotePost,
  downVote: postsDuck.downVotePost,
  fetchCategories: categoriesDuck.fetchCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
