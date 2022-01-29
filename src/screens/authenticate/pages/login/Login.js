import React, { useState, useContext, useEffect } from 'react'
import { Card, CardMedia, Box, CircularProgress, Button, TextField, InputAdornment } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { FaUserAlt, FaKey } from 'react-icons/fa'
import TerraLogo from 'assets/images/terra-logo.png'
import { authService } from '../../services/authServices'
import cookie from '../../../../utils/cookie'
import authContext from 'store/AuthContext'
import { NotificationManager } from 'react-notifications'

import './style.scss'

function Login() {
  let history = useHistory()
  const AuthContext = useContext(authContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('permissions')
  }, [])

  async function loginMerchant() {
    setIsLoading(true)
    const payload = {
      username,
      password
    }

    const result = await authService.token(payload)
    const token = result?.data?.token
    const expiresAt = result?.data?.expiresAt
    cookie.setCookie('Bearer', `Bearer ${token}`, expiresAt, true)

    if (token) {
      const result_user = await authService.login(payload)
      const result_permissions = await authService.getPermissions(payload)
      const user = result_user?.data?.data
      const permissions = result_permissions?.data?.data || []

      if (user && permissions?.length !== 0) {
        const user_string = JSON.stringify(user)
        const permissions_string = JSON.stringify(permissions)
        localStorage.setItem('user', user_string)
        localStorage.setItem('permissions', permissions_string)
        AuthContext.setIsLoggedIn(true)
        history.push('/')
        window.location.reload()
      } else {
        NotificationManager.error('Böyle bir kullanıcı bulunamadı')
        cookie.removeCookie('Bearer')
      }
    } else {
      NotificationManager.error('Böyle bir kullanıcı bulunamadı')
      cookie.removeCookie('Bearer')
    }
    setIsLoading(false)
  }

  return (
    <div className="login">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Card sx={{ display: 'flex', height: 500 }}>
          <CardMedia
            component="img"
            image={TerraLogo}
            alt="Live from space album cover"
            sx={{ width: 400, display: { xs: 'none', md: 'none', lg: 'block' } }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', width: 400 }}>
            <div
              style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
            >
              <TextField
                label="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUserAlt />
                    </InputAdornment>
                  )
                }}
                variant="standard"
                sx={{ margin: '0 5px 5px 5px', width: '70%' }}
              />
              <form onSubmit={loginMerchant} style={{ margin: '0 5px 25px 5px', width: '70%' }}>
                <TextField
                
                  autoComplete="on"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaKey />
                      </InputAdornment>
                    )
                  }}
                  fullWidth
                  variant="standard"
                />
              </form>
              <Button onClick={loginMerchant} size="small" variant="contained" className="login-button">
                Giriş
              </Button>
            </div>
          </Box>
        </Card>
      )}
    </div>
  )
}

export default Login

/*

<Card>
                <CardContent>
                    <Grid container spacing={2} width={800} height={505}>
                        <Grid item md={6}>

                        </Grid>
                        <Grid item md={6} className="login-right-grid">
                            <div>
                                <TextField
                                    label="Kullanıcı Adı"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaUserAlt />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                />
                                <form>
                                    <TextField
                                        autoComplete="on"
                                        label="Password"
                                        type="password"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FaKey />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                    />
                                </form>
                                <Button size="small" variant="contained" className="login-button">Firma Girişi</Button>
                            </div>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
*/
