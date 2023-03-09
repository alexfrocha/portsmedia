import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from 'scenes/homePage'
import LoginPage from 'scenes/loginPage'
import ProfilePage from 'scenes/profilePage'

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from 'theme.js'
import { CookiesProvider } from 'react-cookie'
import useCookies from 'react-cookie/cjs/useCookies'

function App() {

  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = useSelector((state) => state.token)
  const [cookies, setCookie] = useCookies(['auth'])

  return (
    <div>
      <BrowserRouter>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={cookies.auth && isAuth ? <HomePage /> : <Navigate to="/" />} />
              <Route path="/profile/:userId" element={cookies.auth && isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            </Routes>
          </ThemeProvider>
        </CookiesProvider>
      </BrowserRouter>
    </div>
  )
}

export default App