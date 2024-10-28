import ColorPicker from "./ColorPicker"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (succes: boolean) => {
    setIsAuthenticated(succes);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          isAuthenticated ? <ColorPicker /> : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
