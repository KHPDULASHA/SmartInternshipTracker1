import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'
import AddInternship from '../pages/AddInternship'
import Dashboard from '../pages/Dashboard'
import InternshipList from '../pages/InternshipList'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { isAuthenticated } from '../services/authService'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/internships" element={<InternshipList />} />
          <Route path="/add-internship" element={<AddInternship />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} replace />} />
      <Route path="*" element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}
