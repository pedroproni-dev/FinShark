import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./context/useAuth";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import { HomePage } from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import PortfolioPage from "./pages/PortfolioPage";
import CompanyPage from "./pages/CompanyPage";
import { LoginPage, RegisterPage } from "./pages/AuthPages";

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/company/:symbol" element={<CompanyPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="bottom-right"
          theme="dark"
          autoClose={3000}
        />
      </div>
    </UserProvider>
  );
}

export default App;
