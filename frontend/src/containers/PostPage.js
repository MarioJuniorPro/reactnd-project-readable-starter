import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { Container } from 'semantic-ui-react'

import DefaultLayout from './DefaultLayout'

export class Post extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
      <DefaultLayout>
        <Container text style={{ marginTop: '5rem' }}>
          Post

        </Container>
      </DefaultLayout>
    )
  }
}

export default Post
