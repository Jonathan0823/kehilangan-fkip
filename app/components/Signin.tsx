"use client";

import { FaEnvelope,FaRegUserCircle, FaLock, FaUser } from 'react-icons/fa';
import React from 'react';
import { account } from '../appwrite/config';

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await account.createEmailPasswordSession(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center"> 
      <div className="bg-white p-8 rounded-lg  w-dvw">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-600">Sign In</h2> 
        
        <div className="flex justify-center mb-6">
          <FaRegUserCircle className="text-gray-400 mr-3"  size={100}/>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2 border-sky-400">
              <FaEnvelope className="text-sky-400 mr-3" /> 
              <input
                type="email"
                id="email"
                className="w-full focus:ring focus:ring-sky-200 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2 border-sky-400"> 
              <FaLock className="text-sky-400 mr-3" />
              <input
                type="password"
                id="password"
                className="w-full focus:ring focus:ring-sky-200 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:ring focus:ring-sky-300 focus:outline-none">
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-sky-500 hover:underline">
            Forgot Password?
          </a>
          <p className="mt-2 text-sm">
            Don&apos;t have an account?
            <a href="/signup" className="text-sky-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
