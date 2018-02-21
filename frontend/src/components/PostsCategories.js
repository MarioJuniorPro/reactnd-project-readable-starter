import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export const PostsCategories = props => {

  const defaults = [
    {title: 'Hot', path: '/' },
    {title: 'React', path: '/react' },
    {title: 'Redux', path: '/redux' },
    {title: 'Udacity', path: '/udacity' }
  ]
  const links = props.categories || defaults


  return (
    <nav className="posts__categories">
      <ul className="categories-list">
        { links.map(link => (
          <li key={link.path} className="categories-item">
            <NavLink
              className="categories-item__link"
              activeClassName="categories-item__link--active"
              to={link.path}
              exact
            >
              {link.title}
            </NavLink>
          </li>
        ))}
       
      </ul>
    </nav>
  )
}

PostsCategories.displayName = 'PostsCategories'

PostsCategories.propTypes = {}

export default PostsCategories
