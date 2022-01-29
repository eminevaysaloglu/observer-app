import React, { useState, useEffect, useContext } from 'react'
import classNames from 'classnames'
import Route from '../router'
import { Sidebar, Header } from 'components'
import { useLocation, useHistory } from 'react-router-dom'
import { auth } from 'utils/auth'
import authContext from '../store/AuthContext'
import './style.scss'
import NotificationManager from 'react-notifications/lib/NotificationManager'
import { authService } from 'screens/authenticate/services/authServices'

function IsLoggedIn() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const history = useHistory()
  const AuthContext = useContext(authContext)

  function mainContainerClass() {
    return classNames('main-container', { 'sidebar-open': sidebarOpen })
  }

  async function getPermissions() {
    const username = JSON.parse(localStorage.getItem('user'))?.user?.id
    if (!username) return
    const result_permissions = await authService.getPermissions({ username })
    const permissions = result_permissions?.data?.data || []
    const permissions_string = JSON.stringify(permissions)
    localStorage.setItem('permissions', permissions_string)
  }

  useEffect(() => {
    getPermissions()
  }, [])

  useEffect(() => {
    if (!auth.isLoggedIn()) {
      NotificationManager.error('Tekrar giriş yapmanız gerekmektedir.')
      auth.logOut()
      AuthContext.setIsLoggedIn(false)
      AuthContext.setIsUser(null)
      AuthContext.setPermissions(null)
      history.push('/')
    }
  }, [location])

  return (
    <div className="main">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={mainContainerClass()}>
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        <div className="main-container-route">
          <Route />
        </div>
      </div>
    </div>
  )
}

export default IsLoggedIn
