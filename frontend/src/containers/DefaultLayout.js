import React, { Fragment } from 'react'
import {
  Container
} from 'semantic-ui-react'

import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'

export const DefaultLayout = (props) => {
  return (
    <Fragment>
        <Container textAlign={'center'}>
          <DefaultHeader />
        </Container>

        { props.children }       

        <DefaultFooter />
    </Fragment>
  )
}

export default DefaultLayout
