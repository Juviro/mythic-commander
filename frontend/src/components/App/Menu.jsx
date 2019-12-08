import React from 'react'
import { Menu, Icon, Tooltip } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
`

const StyledMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
`

const StyledLogout = styled(Icon).attrs({ type: 'logout' })`
  font-size: 20px;
  margin-right: 10px;
`

export default class MainMenu extends React.Component {
  render() {
    const {
      children,
      location: { pathname },
    } = this.props
    const menuEntries = [
      {
        title: 'Search',
        href: '/search',
        icon: 'search',
      },
      {
        title: 'Cards',
        href: '/cards',
        icon: 'table',
      },
      {
        title: 'Decks',
        href: '/decks',
        icon: 'appstore',
      },
    ]

    return (
      <StyledApp>
        <StyledMenu>
          <Menu mode="horizontal" selectedKeys={pathname}>
            {menuEntries.map(({ title, href, icon }) => (
              <Menu.Item key={href}>
                <Link to={href}>
                  <Icon type={icon} />
                  {title}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
          <Tooltip title="logout" placement="rightBottom">
            <StyledLogout type="logout" onClick={() => console.log('you are now logged out!')} />
          </Tooltip>
        </StyledMenu>
        {children}
      </StyledApp>
    )
  }
}
