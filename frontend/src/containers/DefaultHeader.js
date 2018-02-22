import React from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from 'semantic-ui-react'

const headerContainerStyle = {
  backgroundColor: '#02b3e4',
  // letterSpacing: "0.125rem",
  border: '0.125rem solid transparent',
  borderRight: '0.125rem solid #02ccba',
  borderLeft: '0.125rem solid #02b3e4',
  backgroundImage: 'linear-gradient(to right, #02b3e4 0%, #02ccba 100%)'
  // marginTop: '2em'
}

export const DefaultHeader = () => {
  return (
    <Menu fixed="top" inverted style={headerContainerStyle}>
      <Container>
        <Menu.Item header>
          Udacity Readable
        </Menu.Item>
        <Menu.Item as="a">Home</Menu.Item>
      </Container>
    </Menu>
  )
}

DefaultHeader.displayName = 'DefaultHeader'

export default DefaultHeader
