import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast"




import { ThirdwebProvider } from 'thirdweb/react';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThirdwebProvider >
        <App />
      </ThirdwebProvider>
      <Toaster
        containerClassName="font-space"
      />
    </BrowserRouter>
  </StrictMode>,
)
