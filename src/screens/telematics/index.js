import React, {useContext} from 'react'
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import authContext from 'store/AuthContext'
import TabContainer from 'components/TabContainer'
import AlarmRoutes from './alarms/routes'
import EntityRoutes from './entities/routes'
import ObserverRoutes from './observers/routes'
import TeamsRoutes from './teams/routes'

function Telematics(props) {
  const { path } = useRouteMatch()
  const breadcrumbs = useBreadcrumbs()
  const AuthContext = useContext(authContext)

  const pages = [
    {
      path: `${path}/alarms`,
      to: `${path}/alarms/alarm`,
      routes: AlarmRoutes
    },
    {
      path: `${path}/entities`,
      to: `${path}/entities/entity`,
      routes: EntityRoutes
    },
    {
      path: `${path}/observers`,
      to: `${path}/observers/observer`,
      routes: ObserverRoutes
    },
    {
      path: `${path}/teams`,
      to: `${path}/teams/team`,
      routes: TeamsRoutes
    }
  ]

  return (
    <div>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" style={{ margin: '20px 0' }}>
        {breadcrumbs.map(({ breadcrumb, match }, i) => {
          return breadcrumbs.length === i + 1 ? (
            <Typography key={i} color="text.primary">
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
          <Route
            component={() => <TabContainer routes={page.routes} from={page.path} to={page.to} AuthContext={AuthContext} />}
            path={page.path}
            key={key}
          />
        ))}
      </Switch>
    </div>
  )
}

export default Telematics
