import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { LogIn, UserPlus, LogOut, Wallet } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-100 py-4 px-6 mb-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
          <Wallet size={28} />
          <span>WalletWatch</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            // Shown when Logged In
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-slate-600 hover:text-rose-600 font-medium transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          ) : (
            // Shown when Logged Out
            <>
              <Link to="/login" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                <LogIn size={20} />
                <span>Login</span>
              </Link>
              <Link 
                to="/register" 
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-all shadow-sm shadow-indigo-100"
              >
                <UserPlus size={20} />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;