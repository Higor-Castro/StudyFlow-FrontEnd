import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Router, RouterProvider } from 'react-router-dom'
import router from './routes/AppRoutes.jsx'

// Procura o elemento "root" no HTML e inicia a aplicação React dentro dele
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Disponibiliza as rotas configuradas para toda a aplicação */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
