import React from 'react'
import PropTypes from 'prop-types'

import FaDelete from 'react-icons/lib/fa/trash'
import FaEdit from 'react-icons/lib/fa/edit'

export const PostActions = (props) => {
  return (
    <div style={{position: 'absolute', right: 15}}>
      <FaEdit />
      <FaDelete />
    </div>
  )
}

PostActions.propTypes = {
}

PostActions.displayName = 'PostActions'

export default PostActions
