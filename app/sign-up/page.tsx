"use client";
import { createClient } from "@/supabase/client";
import React, { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Iltimos, to'g'ri email kiriting!");
      return;
    }

    const { data, error } = await supabase.from("Resume_Builder_Users").insert([
      {
        full_name: fullName,
        email,
        password,
      },
    ]);

    if (error) {
      console.log(error.message);
    } else {
      // @ts-ignore
      const userId = data[0].id;

      if (userId) {
        localStorage.setItem("userId", userId);
      }
      location.href = "/";
    }

    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="bg-white border border-black p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Full Name..."
          className="w-full p-3 mb-4 border border-black rounded-lg shadow-sm outline-none"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email..."
            className="pl-10 w-full p-3 border border-black rounded-lg shadow-sm outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password..."
            className="pl-10 w-full p-3 border border-black rounded-lg shadow-sm outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-5 text-gray-500"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-semibold"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
