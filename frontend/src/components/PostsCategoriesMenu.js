import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Input, Select } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import * as postsDuck from '../store/ducks/posts'

export const PostsCategoriesMenu = props => {
  const defaults = [{ name: 'Hot', path: '', active: true }]
  const links = [...defaults, ...props.categories].map(link => {
    link.active = link.path === (props.category ? props.category : '')
    return link
  })

  const sortOptions = [
    {
      key: 'votescore_desc',
      value: 'voteScore_desc',
      icon: 'sort descending',
      text: 'Vote Score desc'
    },
    {
      key: 'votescore_asc',
      value: 'voteScore_asc',
      icon: 'sort ascending',
      text: 'Vote Score asc'
    },
    {
      key: 'timestamp_desc',
      value: 'timestamp_desc',
      icon: 'sort descending',
      text: 'Date desc'
    },
    {
      key: 'timestamp_asc',
      value: 'timestamp_asc',
      icon: 'sort ascending',
      text: 'Date asc'
    }
  ]

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
      <Menu.Menu position="right">
        <Menu.Item>
          {/* <Input icon='search' placeholder='Search...' /> */}
          <Select
            color="blue"
            placeholder="Sort"
            options={sortOptions}
            defaultValue="voteScore_desc"
            onChange={(e, data) => {
              props.updateSortBy(data.value)
            }}
          />
        </Menu.Item>
      </Menu.Menu>
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

const mapDispatchToProps = {
  updateSortBy: postsDuck.updateSortBy
}

export default connect(() => ({}), mapDispatchToProps)(PostsCategoriesMenu)
