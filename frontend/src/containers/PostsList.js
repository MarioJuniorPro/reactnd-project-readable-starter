import React, { Fragment } from 'react'

import PostCard from '../components/PostCard'
import PostsCategories from '../components/PostsCategories'

export const PostsList = () => {

  const posts = [
    {
        "id": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1467166872634,
        "title": "Udacity is the best place to learn React",
        "body": "Everyone says so after all.",
        "author": "thingtwo",
        "category": "react",
        "voteScore": 6,
        "deleted": false,
        "commentCount": 2
    },
    {
        "id": "6ni6ok3ym7mf1p33lnez",
        "timestamp": 1468479767190,
        "title": "Learn Redux in 10 minutes!",
        "body": "Just kidding. It takes more than 10 minutes to learn technology.Just kidding. It takes more than 10 minutes to learn technology.Just kidding. It takes more than 10 minutes to learn technology.Just kidding. It takes more than 10 minutes to learn technology.",
        "author": "thingone",
        "category": "redux",
        "voteScore": -5000,
        "deleted": false,
        "commentCount": 4000
    }
]
  
  return (
    <Fragment>
      <PostsCategories />
      <section className="posts-cards">
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </section>
    </Fragment>
  )
}

PostsList.displayName = 'PostsList'

export default PostsList

