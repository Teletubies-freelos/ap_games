import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import { env } from './config/index.ts'

if(import.meta.env.DEV && env.IS_MSW_ON){
  const { worker } = await import('../../../packages/mock-service/src/browser')

  worker.start()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
