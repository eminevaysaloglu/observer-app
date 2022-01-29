import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from '@mui/material'
import { BrowserRouter as Router, Route, useHistory, useLocation, Redirect } from 'react-router-dom'

function container(props) {
  const { routes, AuthContext } = props
  const location = useLocation()
  const tabs = routes.filter((e) => e.tabView)
  const tabIndex = routes.findIndex((e) => e.path === location.pathname)
  const [tabValue, setTabValue] = useState(tabIndex !== -1 && routes[tabIndex].tabView  ? tabIndex : 0)
  const history = useHistory()

  useEffect(() => {
    if (tabIndex === routes.length - 1) history.push(routes[routes.length - 1].to)
  }, [])

  function changeTab(e) {
    const path = tabs[e].path
    history.push({ pathname: path })
    setTabValue(e)
  }

  return (
    <div>
      <Tabs value={tabValue} onChange={(_, e) => changeTab(e)} style={{ marginBottom: '30px' }}>
        {tabs.map((route, key) => (!route.to ? <Tab key={key} label={route.name} /> : null))}
      </Tabs>
      <div>
        {routes.map((route, key) =>
          AuthContext.permissions.some((e) => e.permission.id === route.module) ? (
            !route.to ? (
              <Route key={key} path={route.path} component={route.component} name={route.name} />
            ) : null
          ) : key === tabValue ? (
            <div key={key}>Bu sayfaya erişiminiz bulunmamaktadır...</div>
          ) : null
        )}
      </div>
    </div>
  )
}

export default container
