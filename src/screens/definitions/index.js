import React, {useContext} from 'react'
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import authContext from 'store/AuthContext'
import TabContainer from 'components/TabContainer'
import VehicleRoutes from './vehicle/routes'
import MainDevicesRoutes from './device/routes'
import MainNotificationsRoutes from './notifications/routes'
import UsersRoutes from './users/routes'
import AccesManagementRoutes from './access-management/routes'

function Definitions(props) {
  const { path } = useRouteMatch()
  const breadcrumbs = useBreadcrumbs()
  const AuthContext = useContext(authContext)

  const pages = [
    {
      path: `${path}/users`,
      to: `${path}/users/user`,
      routes: UsersRoutes
    },
    {
      path: `${path}/devices`,
      to: `${path}/devices/device`,
      routes: MainDevicesRoutes
    },
    {
      path: `${path}/notifications`,
      routes: MainNotificationsRoutes
    },
    {
      path: `${path}/vehicles`,
      to: `${path}/vehicles/vehicle`,
      routes: VehicleRoutes
    },
    {
      path: `${path}/access-management`,
      to: `${path}/access-management/role`,
      routes: AccesManagementRoutes
    }
  ]

  return (
    <div>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" style={{ margin: '20px 0' }}>
        {breadcrumbs.map(({ breadcrumb, match }, i) => {
          return breadcrumbs.length === i + 1 ? (
            <Typography key="3" color="text.primary">
              {breadcrumb}
            </Typography>
          ) : (
            <Link underline="hover" key={i} color="inherit" href={match.path}>
              {breadcrumb}
            </Link>
          )
        })}
      </Breadcrumbs>
      <Switch>
        {pages.map((page, key) => (
          <Route component={() => <TabContainer routes={page.routes} from={page.path} to={page.to} AuthContext={AuthContext} />} path={page.path} key={key} />
        ))}
      </Switch>
    </div>
  )
}

export default Definitions
