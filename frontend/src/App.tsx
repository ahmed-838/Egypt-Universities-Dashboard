import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Home } from './pages/Home';
import { UniversityList } from './pages/UniversityList';
import { AdminUniversities } from './pages/AdminUniversities';
import { Login } from './pages/Login';
import { UniversityDetails } from './pages/UniversityDetails';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/universities" element={<UniversityList />} />
              <Route path="/universities/:id" element={<UniversityDetails />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin/universities"
                element={
                  <ProtectedRoute>
                    <AdminUniversities />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}