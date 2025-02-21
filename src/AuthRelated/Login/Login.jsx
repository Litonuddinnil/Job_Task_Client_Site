import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Helmet } from 'react-helmet-async';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const Login = () => {
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const result = await logIn(email, password); 
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen bg-base-200 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Login - Task Manager</title>
      </Helmet>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
        <p className="text-center text-gray-500 mb-6">Sign in to manage your tasks efficiently.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              placeholder="example@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
              placeholder="********"
            />
            <button
              type="button"
              className="absolute top-12 right-3 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form> 

        <SocialLogin />

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">Register here</Link>
        </p>
      </div>

    

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;
