import { Link, Route, Routes } from 'react-router-dom'
import PermissionsList from './pages/PermissionsList'
import CreatePermissionPage from './pages/CreatePermissionPage'
import EditPermissionPage from './pages/EditPermissionPage'

export default function App() {
  return (
    <div>
      <nav className="bg-white border-b border-slate-200">
        <div className="container-page flex items-center justify-between py-4">
          <Link to="/" className="text-lg font-semibold">N5 Permissions</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PermissionsList />} />
        <Route path="/permissions/new" element={<CreatePermissionPage />} />
        <Route path="/permissions/:id/edit" element={<EditPermissionPage />} />
      </Routes>
      <footer className="container-page text-center text-xs text-slate-400">
        Juan Linares
      </footer>
    </div>
  )
}
