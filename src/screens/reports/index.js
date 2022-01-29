import React, { useContext } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import TabContainer from 'components/TabContainer'
import Container from './container'
import authContext from 'store/AuthContext'
import routes from './routes'

function reports() {
  const { path } = useRouteMatch()
  const breadcrumbs = useBreadcrumbs()
  const AuthContext = useContext(authContext)

  const pages = [
    {
      path: `${path}/reports`,
      to: `${path}/reports/vehicle-report`,
      routes: routes
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
          <Route key={key} component={() => <TabContainer routes={page.routes} from={page.path} to={page.to} AuthContext={AuthContext} />} />
        ))}
      </Switch>
    </div>
  )
}

/* 
<div>{page.to}</div>
 <Route
            component={() => <TabContainer routes={page.routes} from={page.path} to={page.to} AuthContext={AuthContext} />}
            path={page.path}
            key={key}
          />
*/

export default reports
