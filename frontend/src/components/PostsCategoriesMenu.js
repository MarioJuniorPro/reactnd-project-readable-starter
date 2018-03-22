import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Input, Select,Button, Icon, Modal, Header } from 'semantic-ui-react'
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
      icon: 'sort numeric descending',
      text: 'Vote Score desc'
    },
    {
      key: 'votescore_asc',
      value: 'voteScore_asc',
      icon: 'sort numeric ascending',
      text: 'Vote Score asc'
    },
    {
      key: 'timestamp_desc',
      value: 'timestamp_desc',
      icon: 'sort content descending',
      text: 'Date desc'
    },
    {
      key: 'timestamp_asc',
      value: 'timestamp_asc',
      icon: 'sort content ascending',
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
        
        <Modal trigger={<Button color="blue"><Icon name='add' />Create Post</Button >}>
          <Modal.Header>Create new post</Modal.Header>
          <Modal.Content >
            
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        </Menu.Item>
        <Menu.Item>
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
