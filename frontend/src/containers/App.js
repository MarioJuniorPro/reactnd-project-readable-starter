import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import PostsList from './PostsList'
import NotFound from './NotFound'

class App extends Component {

  render() {
    return (
      <Fragment>
        <header className="page__header">Udacity Readable Project</header>
        <main className="page__main">
          <Switch>
            <Route path="/:categories?" render={(props) => (<PostsList />)}/>
            <Route component={NotFound}/>
          </Switch>
        </main>
        <footer className="page__footer">Footer</footer>
      </Fragment>
      // <div className="container">
      //   <header className="page-header">Esse é o Header</header>
      //   <nav className="page-nav">
      //     <ul className="menu">
      //       <li>Hot</li>
      //       <li>React</li>
      //       <li>Udacity</li>
      //       <li>React Native</li>
      //     </ul>
      //   </nav>
      //   <main className="page-main">
      //     <section>
      //       post
      //     </section>
      //     <section>
      //       post
      //     </section>
      //   </main>
      //   <footer className="page-footer">meu footer</footer>
      // </div>
    )
  }
}

export default App
