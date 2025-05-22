"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { Logo } from "@/components/logo";
import { SignupForm } from "@/app/types";
import { useAppContext } from "@/lib/AppContext";
import { AuthSchemaType } from "@kabir.26/uniwall-commons";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

const Signup = () => {
  const router = useRouter();
  const { setUsername } = useAppContext();

  const handleSignupClicked = async (formObj: SignupForm) => {
    try {
      console.log("handle signup");
      const body: AuthSchemaType = {
        username: formObj.username,
        password: formObj.password,
      };
      console.log(body);
      const res = await axiosInstance.post("/auth/signup", body);
      console.log(res);

      if (res.data.success) {
        if (res.data.token) {
          localStorage.removeItem("token");
          localStorage.setItem("token", res.data.token);
          sessionStorage.setItem("username", formObj.username);
          setUsername(formObj.username);
          toast.success(res.data.message);

          await new Promise((resolve) =>
            resolve(
              setTimeout(() => {
                router.push("/recovery");
              }, 2000)
            )
          );
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to sign up. Please try again.");
    }
  };

  const [errors, setErrors] = useState<SignupForm | null>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = (formData: SignupForm): [boolean, SignupForm] => {
    let isValid = true;

    const errors: SignupForm = {
      username: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    } else if (formData.username.trim().length < 6) {
      errors.username = "Username must be at least 6 characters";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    return [isValid, errors];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());

    const res = validateForm({
      username: formObj.username as string,
      password: formObj.password as string,
      confirmPassword: formObj.confirmPassword as string,
    });
    if (res[0]) {
      handleSignupClicked({
        username: formObj.username as string,
        password: formObj.password as string,
        confirmPassword: formObj.confirmPassword as string,
      });
      setErrors(null);
    } else {
      setErrors({
        username: res[1].username,
        password: res[1].password,
        confirmPassword: res[1].confirmPassword,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <h1 className="text-2xl font-semibold text-center text-blue-500 mb-8">
          Create Your Wallet
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors?.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors?.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors?.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white font-medium rounded-md transition-opacity"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
