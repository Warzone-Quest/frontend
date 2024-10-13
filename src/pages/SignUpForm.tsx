import React from 'react';
import signupImg from '../assets/Images/login_img.jpg';


const SignUpForm: React.FC = () => {
  return (
    <div className="min-h-screen h-full w-full flex items-center justify-center" style={{ backgroundColor: '#625a81' }}>
      <div className="p-5 rounded-xl shadow-2xl shadow-black w-full h-4/6 max-w-5xl flex justify-between" style={{backgroundColor: '#2B2738'}}>
        <div className="h-auto w-1/2 pr-4 ">
          <img src={signupImg} alt="background" className="w-full h-full object-cover rounded-xl"/>
        </div>
        <div className="p-6 py-10 mr-4 m-4">
          <h2 className="text-3xl text-white mb-4 text-center">Create an account</h2>
          <p className="text-gray-400 mb-6 text-center">
            Already have an account? <a href="#" className="text-purple-400">Log in</a>
          </p>

          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="First name"
              className="w-1/2 p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-1/2 p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none"
          />

          <div className=" mb-6 flex items-center">
            <div style={{zoom:1.7}}><input type="checkbox" className="mr-2" /></div>
            <span className="text-gray-400">
              I agree to the <a href="#" className="text-purple-400">Terms & Conditions</a>
            </span>
          </div>

          <button className="w-full p-3 bg-purple-600 text-white rounded-lg mb-4 hover:bg-purple-500">
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
