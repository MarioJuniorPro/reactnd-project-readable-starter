import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import Post from './Post'
import Posts from './Posts'
import NotFound from './NotFound'

class App extends Component {

  render() {
    return (
      <Fragment>
        <header className="page__header">Udacity Readable Project</header>
        <main className="page__main">
          <Switch>
            {/* <Route exact path="/" render={(props) => (<Posts category={props.match.params.category}/>)}/> */}
            <Route exact path="/:category/:post_id" render={(props) => (<Post/>)}/>
            <Route path="/:category?" render={(props) => (<Posts category={props.match.params.category}/>)}/>
            <Route component={NotFound}/>
          </Switch>
        </main>
        <footer className="page__footer">Footer</footer>
      </Fragment>
    )
  }
}

export default App
