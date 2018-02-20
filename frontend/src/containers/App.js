import React, { Component, Fragment } from 'react'

import PostCard from '../components/PostCard'

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className="page__header">Udacity Readable Project</header>
        <main className="page__main">
          <nav className="posts__categories">
            <ul className="categories-list">
              <li className="categories-item">
                <a className="categories-item__link" href="#">Hot</a>
              </li>
              <li className="categories-item">
                <a className="categories-item__link" href="#">React</a>
              </li>
              <li className="categories-item categories-item--active">
                <a className="categories-item__link" href="#">React Native</a>
              </li>
              <li className="categories-item">
                <a className="categories-item__link" href="#">Udacity</a>
              </li>              
            </ul>
          </nav>
          <section className="posts-cards">
            { [1,2,3,4,5,6].map(e => (
              <PostCard key={e} post={{id: e+'a', voteScore: Math.floor(Math.random() * 1000)}}/>
            ))}
          </section>
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
