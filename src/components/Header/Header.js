import React, { useState, useContext } from 'react'
import './style.scss'
import classNames from 'classnames'
import { Avatar, Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material'
import { auth } from '../../utils/auth'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import authContext from '../../store/AuthContext'
import { FaBars, FaPowerOff, FaUserAlt } from 'react-icons/fa'
import MenuIcon from '@mui/icons-material/Menu';
function Header(props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState()
  const AuthContext = useContext(authContext)
  const history = useHistory()

  function recordButtonPosition(event) {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  function sidebarOpenClass() {
    return classNames('main-header', { 'sidebar-open': props.sidebarOpen })
  }

  function changeSidebarOpen() {
    props.setSidebarOpen(!props.sidebarOpen)
  }

  function logoutMerchant() {
    auth.logOut()
    AuthContext.setIsLoggedIn(false)
    AuthContext.setIsUser({})
    AuthContext.setPermissions([])
    history.push('/')
  }

  return (
    <div className={sidebarOpenClass()}>
      <IconButton aria-label="delete" onClick={changeSidebarOpen} size="small">
        <MenuIcon sx={{ color: 'white' }} />
      </IconButton>
      <div className="main-header-right">
        <Avatar alt={AuthContext?.user?.firstname} src="/static/images/avatar/1.jpg" onClick={recordButtonPosition} />
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={closeMenu}
          className="menu"
          PaperProps={{
            elevation: 0,
            sx: {
              width: 180,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <ListItemIcon>
              <FaUserAlt />
            </ListItemIcon>
            Profil
          </MenuItem>
          <MenuItem onClick={logoutMerchant}>
            <ListItemIcon>
              <FaPowerOff />
            </ListItemIcon>
            Çıkış Yap
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Header
