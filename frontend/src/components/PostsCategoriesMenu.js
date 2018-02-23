import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export const PostsCategoriesMenu = props => {
  const defaults = [{ name: 'Hot', path: '', active: true }]
  const links = [...defaults, ...props.categories].map(link => {
    link.active = link.path === (props.category ? props.category : '')
    return link
  })

  return (
    <Menu pointing>
      {links.map(link => (
        <Menu.Item
          key={link.name}
          as={Link}
          name={link.name}
          active={link.active}
          to={`/${link.path}`}
          // exact
        />
      ))}
    </Menu>
  )
}

PostsCategoriesMenu.displayName = 'PostsCategoriesMenu'

PostsCategoriesMenu.propTypes = {
  categories: PropTypes.array
}

PostsCategoriesMenu.defaultProps = {
  categories: []
}

export default PostsCategoriesMenu
