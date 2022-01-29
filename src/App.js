import './App.scss'
import AuthState from './store/AuthState'
import MainContianer from './container/MainContainer'
import 'react-notifications/lib/notifications.css'
import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'

function App() {
  return (
    <AuthState>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <div className="App">
          <MainContianer />
        </div>
      </LocalizationProvider>
    </AuthState>
  )
}

export default App
