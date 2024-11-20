"use client";

import { FaEnvelope, FaLock } from "react-icons/fa";
import React from "react";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState<string>(" ");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setSending(true);
      console.log(email, password);
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res?.error) {
        setError("Login Failed");
        return;
      }
      setSuccessMessage("Login Success");
      setEmail("");
      setPassword("");
      window.location.href = "/";
    } catch (error) {
      setError("Login Failed");
      throw error;
    } finally {
      if (error) {
        setSending(false);
      }
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="bg-white p-8 lg:min-h-0 min-h-dvh rounded-lg  max-w-sm w-full">
        <h2 className="text-5xl font-bold mb-6 justify-start text-black">
          Sign In
        </h2>

        <div className="flex justify-center mb-6">
        <Image
              width={500}
              height={400}
              src="/Signin.png"
              alt="Server Illustration"
            />
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4 mx-2">
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2 border-sky-300">
              <FaEnvelope className="text-sky-300 mr-3" />
              <input
                type="email"
                id="email"
                className="w-full focus:outline-none py-1 placeholder-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6 mx-2">
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2 border-sky-300">
              <FaLock className="text-sky-300 mr-3" />
              <input
                type="password"
                id="password"
                className="w-full focus:outline-non placeholder-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              disabled={sending}
              className="w-32 bg-[#69c3f0] mt-3 font-bold text-white py-2 px-5 rounded-lg hover:bg-sky-700 focus:ring focus:ring-sky-300 focus:outline-none"
            >
              {sending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            {successMessage && (
              <p className="mt-2 text-sm text-green-500">{successMessage}</p>
            )}
        </form>
        <div className="text-center mt-4">
          <a
            href="/reset"
            className="text-sm text-black underline hover:font-semibold"
          >
            Forgot Password?
          </a>
          <p className="mt-2 text-sm">
            Tidak punya akun?
            <a
              href="/signup"
              className="text-black font-bold ml-1 underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
