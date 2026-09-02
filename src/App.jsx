import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'
import NotFound from './pages/NotFound'
import { publicRoutes, dashboardRoutes } from './routes'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {publicRoutes.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>

      <Route element={<DashboardLayout />}>
        {dashboardRoutes.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
