import { RouterProvider } from 'react-router-dom'
import './App.css'

//import Register from './pages/register/register'
import Login from './pages/login/login'
import router from './routes/AppRoutes'

function App() {

  return <RouterProvider router={router} />
}

export default App
