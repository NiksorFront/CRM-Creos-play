import React from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from "next-themes";
import {NextUIProvider} from '@nextui-org/react';
import App from './App.tsx';
import './index.css';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import TasksPage from './pages/tasks-page/tasks-page.tsx';
import DesignerPage from './pages/designer-page/designer-page.tsx';
import { Provider } from 'react-redux';
import { store } from './services/store.ts';

const router = createBrowserRouter([
  {
    path: "/", element: <App/>
  },
  {
    path: "/tasks", element: <TasksPage/>
  },
  {
    path:"/designer", element: <DesignerPage/>
  },
  {
    path:"*", element: <p>Ошибка</p>
  }
])

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
