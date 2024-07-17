import React from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from "next-themes";
import {NextUIProvider} from '@nextui-org/react';
import App from './App.tsx';
import './index.css';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import TasksPage from './pages/tasks-page/tasks-page.tsx';
import DesignerPage from './pages/designer-page/designer-page.tsx';

const router = createBrowserRouter([
  {
    path: "/", element: <App/>
  },
  {
    path: "/tasks", element: <TasksPage/>
  },
  {
    path:"/designer", element: <DesignerPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <RouterProvider router={router} />
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
