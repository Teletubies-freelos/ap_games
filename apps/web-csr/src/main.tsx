import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { isMSWOn } from './config/worker.ts'

if(import.meta.env.DEV && isMSWOn){
  const { worker } = await import('../../mockers/src/browser.ts')

  await worker.start({
    waitUntilReady: true
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
