import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export const PostsCategories = props => {

  const defaults = [
    {name: 'Hot', path: '' }
  ]
  const links = [...defaults, ...props.categories]


  return (
    <nav className="posts__categories">
      <ul className="categories-list">
        { links.map(link => (
          <li key={link.path} className="categories-item">
            <NavLink
              className="categories-item__link"
              activeClassName="categories-item__link--active"
              to={`/${link.path}`}
              exact
            >
              {link.name}
            </NavLink>
          </li>
        ))}
       
      </ul>
    </nav>
  )
}

PostsCategories.displayName = 'PostsCategories'

PostsCategories.propTypes = {
  categories: PropTypes.array
}

PostsCategories.defaultProps = {
  categories: []
}

export default PostsCategories
