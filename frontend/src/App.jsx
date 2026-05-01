//File principale dell'app
//Da modificare
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registrazione from "./pages/Registrazione.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import {useAuth} from "./hooks/useAuth.jsx";
import Missioni from "./pages/Missioni.jsx";
import MissioneDettaglio from "./pages/MissioneDettaglio.jsx";
import Premi from "./pages/Premi.jsx";
import RiscattoPremio from "./pages/RiscattoPremio.jsx";
import Punti from "./pages/Punti.jsx";
import Storico from "./pages/Storico.jsx";
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
        <Route path="/missioni-completate" element={ <ProtectedRoute><MissioniCompletate /></ProtectedRoute>
  }
/>
        <Route path="/premi" element={<ProtectedRoute> <Premi /> </ProtectedRoute>} />
        <Route path="/premi/:id" element={<ProtectedRoute> <RiscattoPremio /></ProtectedRoute>}/>
        <Route path="/punti" element={<ProtectedRoute><Punti /></ProtectedRoute>}></Route>
        <Route path="/storico" element={<ProtectedRoute><Storico/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}