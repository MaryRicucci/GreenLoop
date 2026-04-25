//File principale dell'app
//Da modificare
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registrazione from "./pages/Registrazione.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import {useAuth} from "./hooks/useAuth.jsx";
import Missioni from "./pages/Missioni.jsx";
import MissioneDettaglio from "./pages/MissioneDettaglio.jsx";
function ProtectedRoute({children}){
  const {user} = useAuth();
  return user ? children : <Navigate to="/login" />
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registrazione" element={<Registrazione />} />
        <Route path="/login" element={<Login />} />
        <Route 
        path = "/dashboard"
        element = {
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        />
        <Route 
          path="/missioni"
          element = {
            <ProtectedRoute>
              <Missioni />
            </ProtectedRoute>
          }
        />
        <Route
          path="/missioni/:id"
          element={
            <ProtectedRoute>
              <MissioneDettaglio  />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}