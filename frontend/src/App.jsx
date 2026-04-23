//File principale dell'app
//Da modificare
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registrazione from "./pages/Registrazione";
import Dashboard from "./pages/Dashboard";
import {useAuth} from "./hooks/useAuth";

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

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}