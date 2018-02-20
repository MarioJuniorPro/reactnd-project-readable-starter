import React, { Component, Fragment } from 'react'

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className="page__header">Header</header>
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
            <article className="posts-card">
              <div className="vote-score">
                <button className="vote-score__increase" title="Increment">&uarr;</button>
                <span className="vote-score__counter">0</span>
                <button className="vote-score__increase" title="Decrement">&darr;	</button>
              </div>
              <div className="posts-card__info-container">
                <h2 className="posts-card__title">
                  <a href="#">Learn Redux in 10 minutes!</a>
                </h2>
                <span className="posts-card__author">Necrower</span>
                <p className="posts-card__comments-count">7 comments</p>              
              </div>
            </article>
            <article className="posts-card">Post 2</article>
            <article className="posts-card">Post 3</article>
            <article className="posts-card">Post 4</article>
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
