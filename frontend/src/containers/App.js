import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import PostPage from './PostPage'
import PostEditPage from './PostEditPage'
import PostsPage from './PostsPage'
import NotFound from './NotFound'
import ScrollToTop from './ScrollToTop'


class App extends Component {

  render() {
    return (
      <Fragment>
        <Route component={ScrollToTop} />
        <Switch>
          <Route exact path="/:category/:post_id/edit" render={(props) => (<PostEditPage />)}/>
          <Route exact path="/:category/:post_id" render={(props) => {
            const {category, post_id} = props.match.params
            return <PostPage category={category} postId={post_id}/>
          }}/>
          <Route path="/:category?" render={(props) => (<PostsPage category={props.match.params.category}/>)}/>
          <Route component={NotFound}/>
        </Switch>
      </Fragment>
    )
  }
}

export default App
