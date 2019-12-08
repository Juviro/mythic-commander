import React from 'react'
import { Menu, Icon } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
`

export default class MainMenu extends React.Component {
  render() {
    const { children } = this.props
    const menuEntries = [
      {
        title: 'Search',
        href: '/search',
        icon: 'mail',
      },
      {
        title: 'Collection',
        href: '/collection',
      },
      {
        title: 'Decks',
        href: '/decks',
      },
    ]

    return (
      <StyledApp>
        <StyledMenu>
          <Menu mode="horizontal" selectedKeys={window.location.pathname}>
            {menuEntries.map(({ title, href, icon }) => (
              <Menu.Item key={href}>
                <Link to={href}>
                  <Icon type={icon} />
                  {title}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </StyledMenu>
        {children}
      </StyledApp>
    )
  }
}
