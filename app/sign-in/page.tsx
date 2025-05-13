"use client";
import { createClient } from "@/supabase/client";
import React, { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // MUHIM

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Iltimos, email va parolni kiriting!");
      return;
    }

    const { data, error } = await supabase
      .from("Resume_Builder_Users")
      .select("*")
      .eq("email", email)
      .eq("password", password);

    if (error) {
      toast.error("Xatolik yuz berdi: " + error.message);
      return;
    }

    if (data && data.length > 0) {
      const userId = data[0].id; // user ID ni olish
      console.log("User ID:" + userId);
      localStorage.setItem("userId", userId); // localStorage ga saqlash
      toast.success("Muvaffaqiyatli tizimga kirdingiz!");
      // setTimeout(() => {
      //   location.href = "/dashboard";
      // }, 1500);
    } else {
      toast.warning("Email yoki parol noto‘g‘ri!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer position="top-center" autoClose={3000} />
      <form
        onSubmit={handleSignIn}
        className="bg-white border border-black p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Log In
        </h2>

        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            className="pl-10 w-full p-3 border border-black rounded-lg shadow-sm outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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
          Log In
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
