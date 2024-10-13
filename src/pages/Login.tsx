import React from 'react';
import loginImg from '../assets/Images/login_img.jpg';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen h-full w-full flex items-center justify-center" style={{ backgroundColor: '#676279' }}>
      <div className=" p-5 rounded-xl shadow-2xl shadow-black w-full h-4/6 max-w-5xl flex justify-between" style={{backgroundColor: '#2B2738'}}>
        <div className="h-auto w-1/2 pr-6">
          <img src={loginImg} alt="background" className="w-full h-full object-cover rounded-xl"/>
        </div>
        <div className="p-6 py-20 mr-4 m-4">
          <h2 className="text-3xl text-white mb-4 text-center">Log in to your account</h2>
          <p className="text-gray-400 mb-6 text-center">
            Don't have an account? <a href="#" className="text-purple-400">Sign up</a>
          </p>

          {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none"
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none"
            />

            {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div style={{zoom:1.7}}><input type="checkbox" className="mr-2"/></div>
              <label className="text-gray-400">Remember me</label>
            </div>
            <a href="#" className="text-purple-400">Forgot password?</a>
          </div>
          

          {/* Login Button */}
          <button className="w-full p-3 bg-purple-600 text-white rounded-lg mb-4 hover:bg-purple-500">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;


const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
