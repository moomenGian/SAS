import React from 'react'
import ReactDOM from 'react-dom/client'
import SectionPage from './components/SectionPage/SectionPage'
import Dashboard from './components/Dashboard/Dashboard'
import Loginpage from './components/LoginPage/LoginPage'
import App from './App'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Homepage from './components/Homepage/Homepage'
import { CaseStatusPage } from './components/SectionPage/CaseStatus/CaseStatusPage'
import { PrintCase } from './components/SectionPage/CaseStatus/printCase'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/section/:Strand/:sectionName',
    element: <SectionPage />
  },
  {
    path: '/Dashboard',
    element: <Dashboard />
  },
  {
    path: '/Login',
    element: <Loginpage />
  },
  {
    path: '/Home',
    element: <Homepage />
  },
  {
    path: '/CaseStatus/:caseID',
    element: <CaseStatusPage />
  },
  {
    path: '/printCase/:caseID',
    element: <PrintCase />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
