import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-black text-emerald-400">🦈 FinShark</span>
      </Link>

      <div className="flex items-center gap-6">
        {isLoggedIn() ? (
          <>
            <Link
              to="/search"
              className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
            >
              Search
            </Link>
            <Link
              to="/portfolio"
              className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
            >
              Portfolio
            </Link>
            <span className="text-slate-400 text-sm">Olá, {user?.userName}</span>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
