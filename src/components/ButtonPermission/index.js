import React, { useContext } from 'react'
import { Button } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import authContext from 'store/AuthContext'

function index(props) {
  const AuthContext = useContext(authContext)
  const { permission, grid, ...otherProps } = props
  return (
    <div>
      {AuthContext.permissions.some((e) => e.permission.id === permission) ? (
        grid ? (
          <GridActionsCellItem {...otherProps}>{props.children}</GridActionsCellItem>
        ) : (
          <Button variant="outlined" {...otherProps}>
            {props.children}
          </Button>
        )
      ) : null}
    </div>
  )
}

export default index
