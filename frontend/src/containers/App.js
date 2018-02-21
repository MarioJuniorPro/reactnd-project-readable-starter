import React, { Component, Fragment } from 'react'

import PostCard from '../components/PostCard'

class App extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         posts: [
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
              "voteScore": -5,
              "deleted": false,
              "commentCount": 0
          }
      ]
      }
    }
    

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
            { this.state.posts.map(post => (
              <PostCard key={post.id} post={post}/>
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
