import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useToast } from '@/components/ui/Toast';
import { Loading } from '@/components/ui/Loading';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Container } from '@/components/layout/Container';
import { validateForm, validationRules } from '@/utils/validation';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { login } from '@/store/slices/authSlice';
import { addToast } from '@/store/slices/toastSlice';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const { isValid, errors: validationErrors } = validateForm(formData, {
      email: validationRules.email,
      password: validationRules.password,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      await dispatch(login({
        userEmailId: formData.email,
        password: formData.password,
      }));
      addToast('Successfully logged in', 'success');
      navigate('/dashboard');
    } catch (err: any) {
      addToast(err.message || 'Failed to login', 'error');
      setErrors({ submit: err.message || 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading variant="fullscreen" text="Signing in..." />;
  }

  return (
    <ErrorBoundary>
      <Container size="sm">
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
              {errors.submit && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {errors.submit}
                </div>
              )}

              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 bg-white/10 border ${
                        errors.email ? 'border-red-500' : 'border-white/20'
                      } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
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
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-3 bg-white/10 border ${
                        errors.password ? 'border-red-500' : 'border-white/20'
                      } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all`}
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
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
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
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-gradient-to-r from-[#0f3460] to-[#16213e] hover:from-[#16213e] hover:to-[#0f3460] focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <Loading variant="button" size="sm" />
                  ) : (
                    <span className="flex items-center">
                      Sign in
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </button>
              </form>

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
      </Container>
    </ErrorBoundary>
  );
}; 