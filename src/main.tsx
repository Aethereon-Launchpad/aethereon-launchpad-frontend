import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast"

import AppProvider from './context'

const cookies = new Headers().get('cookie')




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider cookies={cookies}>

        <App />
      </AppProvider>
      <Toaster
        containerClassName="font-space"
      />
    </BrowserRouter>
  </StrictMode>,
)
