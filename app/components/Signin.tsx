"use client"

import { FaEnvelope, FaLock } from 'react-icons/fa';
import Image from 'next/image';
import React from 'react';
import { account } from '../appwrite/config';

const SignIn: React.FC = () =>{
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

   
    try{
      await account.createEmailPasswordSession('email', 'password');
      setEmail('');
      setPassword('');
    } catch (error){
      console.error(error);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign in</h2>
        
        <div className="flex justify-center mb-6">
            <Image src="/Do_Not_Attempt_profile.jpg" width={200} height={200} alt='img'/>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
              <FaEnvelope className="text-gray-400 mr-3" /> 
              <input
                type="email"
                id="email"
                className="w-full focus:ring focus:ring-indigo-200 focus:outline-none"
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
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
              <FaLock className="text-gray-400 mr-3" /> 
              <input
                type="password"
                id="password"
                className="w-full focus:ring focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none">
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
          <p className="mt-2 text-sm">
            Don&apos;t have an account?
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;