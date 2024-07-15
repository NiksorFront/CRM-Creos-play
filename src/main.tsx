import React from 'react'
import ReactDOM from 'react-dom/client'
import {ThemeProvider} from "next-themes";
import {NextUIProvider} from '@nextui-org/react'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <App/>
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
