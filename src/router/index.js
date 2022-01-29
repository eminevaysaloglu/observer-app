import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Definitions, Tracking, Settings, NotFound, Fuel, Kids, Telematics, Reports } from '../screens/index'
import authContext from 'store/AuthContext'

function index(props) {
  const AuthContext = useContext(authContext)

  const routes = [
    {
      path: '/',
      component: <Tracking />,
      exact: true
    },
    {
      path: '/',
      component: <NotFound />
    },
    {
      path: '/notfound',
      component: <NotFound />
    },
    {
      path: '*',
      component: <Redirect to="/notfound" />
    }
  ]
  return (
    <Switch>
      {routes.map((path, key) =>
        path.permission ? (
          AuthContext.permissions.some((e) => e.permission.id === path.permission) ? (
            path.exact ? (
              <Route exact key={key} path={path.path} component={() => path.component} />
            ) : (
              <Route key={key} path={path.path} component={() => path.component} />
            )
          ) : null
        ) : path.exact ? (
          <Route exact key={key} path={path.path} component={() => path.component} />
        ) : (
          <Route key={key} path={path.path} component={() => path.component} />
        )
      )}
    </Switch>
  )
}

export default index
