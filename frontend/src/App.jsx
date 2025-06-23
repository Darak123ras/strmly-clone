import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AuthForm from './components/Auth/AuthForm';
import UploadPage from './components/Video/Upload';
import FeedPage from './components/Video/Feed';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/login" element={<AuthForm />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/feed" element={<FeedPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}
export default App;