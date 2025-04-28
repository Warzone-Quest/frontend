import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { authApi } from '@/api/auth.api';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Clear previous errors
    setError('');
    setIsLoading(true);

    // Basic validation to ensure both fields are filled
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authApi.login({ userEmailId: email, password });
      if (response?.["user-jwt-token"] != "") {
        navigate('/dashboard');
      } else {
        setError('Something went wrong, please try again!');
      }
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-8 border border-white/10">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-[#0f3460] to-[#16213e] p-4 rounded-full shadow-lg">
                <UserIcon className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/70">Sign in to continue to your dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white/90">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-white" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-white/90">
                Password
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-white" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-white focus:ring-white/30 border-white/20 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleLogin}  // Call the login handler on button click
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-gradient-to-r from-[#0f3460] to-[#16213e] hover:from-[#16213e] hover:to-[#0f346e] focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              <span className="flex items-center">
                Sign in
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </span>
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-white/70">
              Don't have an account?{' '}
              <Link
                to="/auth/signup"
                className="font-medium text-white hover:text-white/80 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
