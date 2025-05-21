"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { AuthSchemaType } from "@kabir.26/uniwall-commons";
import { LoginForm } from "@/app/types";
import Link from "next/link";
import { useAppContext } from "@/lib/AppContext";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const { setUsername } = useAppContext();
  const [errors, setErrors] = useState<LoginForm | null>({
    username: "",
    password: "",
  });

  const handleLoginCLicked = async (formObj: LoginForm) => {
    try {
      console.log("handle login");
      const body: AuthSchemaType = {
        username: formObj.username,
        password: formObj.password,
      };

      const res = await axiosInstance.post("/auth/login", body);

      if (res.data && res.data.token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", res.data.token);
        setUsername(formObj.username);
        toast.success("Login successful");
        setTimeout(() => {
          router.push(res.data.deeplink);
        }, 2000);
      } else {
        toast.error("Login successful but no token received");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials");
    }
  };

  const validateForm = (formData: LoginForm): [boolean, LoginForm] => {
    let isValid = true;
    const errors: LoginForm = {
      username: "",
      password: "",
    };

    if (!formData.username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    return [isValid, errors];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    console.log(formObj);

    const res = validateForm({
      username: formObj.username as string,
      password: formObj.password as string,
    });
    if (res[0]) {
      handleLoginCLicked({
        username: formObj.username as string,
        password: formObj.password as string,
      });
      setErrors(null);
    } else {
      setErrors({
        username: res[1].username,
        password: res[1].password,
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
          Login to Your Wallet
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div>
              <label htmlFor="username" className="block text-gray-700 mb-1">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                className="w-full px-3 py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your username"
              />
              {errors?.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div className="mb-4 mt-4">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                className="w-full px-3 py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {errors?.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="mt-6 text-center text-sm text-gray-600 flex justify-end">
              <Link
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full flex items-center justify-center py-2 px-4 mt-4  bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white font-large rounded-md transition-opacity"
            >
              <UserPlus className="w-5 h-5" />
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
