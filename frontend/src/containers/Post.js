import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Post extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        <h1>POST</h1>
      </div>
    )
  }
}
