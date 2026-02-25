import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; 
import LoginRegisterPage from "./pages/LoginRegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateCapsulePage from "./pages/CreateCapsulePage";
import ViewCapsulesPage from "./pages/ViewCapsulesPage";
import OpenCapsulePage from "./pages/OpenCapsulePage";
import CapsuleAnimationPage from "./pages/CapsuleAnimationPage";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginRegisterPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />} 
          />

          <Route
            path="/create-capsule"
            element={
              <ProtectedRoute>
                <CreateCapsulePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-capsules"
            element={
              <ProtectedRoute>
                <ViewCapsulesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/capsule/:id"
            element={
              <ProtectedRoute>
                <OpenCapsulePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/capsule/:id/animation"
            element={
              <ProtectedRoute>
                <CapsuleAnimationPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
