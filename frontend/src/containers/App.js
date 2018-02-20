import React, { Component, Fragment } from 'react'

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
            <article className="posts-card">
              <div className="vote-score">
                <button className="vote-score__increase" title="Increment">&uarr;</button>
                <span className="vote-score__counter">0</span>
                <button className="vote-score__increase" title="Decrement">&darr;	</button>
              </div>

                <div className="posts-card__info-container">
                <span className="posts-card__title">
                  <a href="#" className="posts-card__link">Learn Redux in 10 minutes!</a>
                </span>
                <span className="posts-card__author">Author: Necrower</span>
                <span className="posts-card__short-description">Just kidding. It takes more than 10 minutes to learn technology.</span>
                <span className="posts-card__comments-count">7 comments</span>              
              </div>
            </article>
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
