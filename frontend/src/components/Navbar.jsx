import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { LogIn, UserPlus, LogOut, Wallet, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setIsOpen(false); // Close the mobile menu on logout
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Added 'relative' so the absolute mobile menu positions correctly underneath
    <nav className="bg-white border-b border-slate-100 py-4 px-6 mb-8 relative z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
          <Wallet size={28} />
          <span>WalletWatch</span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 text-slate-600 hover:text-indigo-600 focus:outline-none transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation (Hidden on small screens) */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-slate-600 hover:text-rose-600 font-medium transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          ) : (
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

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg flex flex-col py-4 px-6 gap-4">
          {user ? (
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-slate-600 hover:text-rose-600 font-medium transition-colors w-full p-2"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors p-2"
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
              <Link 
                to="/register" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 font-medium transition-all shadow-sm shadow-indigo-100 w-full"
              >
                <UserPlus size={20} />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;