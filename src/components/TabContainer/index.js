import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import { BrowserRouter as Router, Route, useHistory, useLocation, Redirect } from 'react-router-dom'

function container(props) {
  const { routes, AuthContext } = props
  const location = useLocation()
  const tabs = routes.filter((e) => (e.tabView && AuthContext.permissions.some((s) => s.permission.id === e.module)) || e.to)
  const tabIndex = tabs.findIndex((e) => e.path === location.pathname)
  const [tabValue, setTabValue] = useState(tabIndex !== -1 && routes[tabIndex].tabView ? tabIndex : 0)
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (tabIndex === tabs.length - 1) {
      setIsLoading(false)
      history.push(tabs[tabs.length - 1].to)
    }
  }, [])

  function changeTab(e) {
    const path = tabs[e].path
    history.push({ pathname: path })
    setTabValue(e)
  }

  return isLoading ? (
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
          ) : key === tabValue ? null : null
        )}
      </div>
    </div>
  ) : null
}

export default container
