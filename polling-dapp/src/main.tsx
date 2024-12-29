import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { StrictMode } from 'react'
import { Buffer } from 'buffer'
import App from './App.tsx'
import './index.css'

window.Buffer = Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
      	<App />
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>,
)
