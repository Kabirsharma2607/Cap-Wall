"use client";

import { useState, useRef } from "react";
// import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { KeyRound } from "lucide-react";

interface ResetPasswordError {
  username: string;
  wordsecret: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordFormData {
  username: string;
  wordsecret: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ForgotPasswordPage() {
  // const router = useRouter()
  const [errors, setErrors] = useState<ResetPasswordError | null>({
    username: "",
    wordsecret: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Create state for the 24 word secret inputs
  const [wordSecrets, setWordSecrets] = useState<string[]>(Array(24).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(24).fill(null));

  // Function to handle input changes and auto-focus
  const handleWordSecretChange = (index: number, value: string) => {
    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    const newWordSecrets = [...wordSecrets];
    newWordSecrets[index] = value;
    setWordSecrets(newWordSecrets);

    // Auto-focus to next input if current input has 4 characters
    if (value.length === 4 && index < 23) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Function to handle paste event
  const handlePaste = (index: number, e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");

    // Check if pasted content contains spaces or looks like multiple words
    if (pastedText.includes(" ")) {
      // Split the pasted text by spaces
      const words = pastedText.trim().split(/\s+/);

      // If we have enough words to fill the grid, use them
      if (words.length >= 24) {
        const newWordSecrets = [...wordSecrets];

        // Fill all boxes with pasted words (up to 4 chars each)
        for (let i = 0; i < 24 && i < words.length; i++) {
          newWordSecrets[i] = words[i].slice(0, 4);
        }

        setWordSecrets(newWordSecrets);

        // Focus the last input after populating all
        if (inputRefs.current[23]) {
          inputRefs.current[23].focus();
        }
      } else {
        // If not enough words, just paste in current input
        handleWordSecretChange(index, pastedText.slice(0, 4));
      }
    } else {
      // If it's just a single word, handle normally
      handleWordSecretChange(index, pastedText.slice(0, 4));
    }
  };

  // Function to handle backspace key
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && wordSecrets[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Function to combine all inputs into a single string
  const combineWordSecrets = () => {
    return wordSecrets.join("");
  };

  const handleResetPassword = async (formObj: ResetPasswordFormData) => {
    try {
      const body = {
        username: formObj.username,
        wordsecret: formObj.wordsecret,
        newPassword: formObj.newPassword,
      };

      const res = await axiosInstance.post("/auth/reset-password", body);

      if (res.status === 200) {
        alert("Password reset successful");
        // router.push('/login')
      } else {
        alert("Password reset failed");
      }
      console.log(body);
    } catch (error) {
      console.log(error);
      alert("Failed to reset password. Please check your details.");
    }
  };

  const validateForm = (
    formData: Record<string, string>,
    wordSecretArray: string[]
  ): [boolean, ResetPasswordError] => {
    let isValid = true;
    const errors: ResetPasswordError = {
      username: "",
      wordsecret: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    }

    // Validate word secret inputs
    const emptyInputs = wordSecretArray.some((word) => word.length === 0);
    const invalidInputs = wordSecretArray.some((word) => word.length !== 4);

    if (emptyInputs || invalidInputs) {
      errors.wordsecret =
        "All word secret fields must contain exactly 4 characters each";
      isValid = false;
    }

    // Validate the combined word secret
    // const combinedSecret = wordSecretArray.join('');
    // if (!/^[a-zA-Z0-9]+$/.test(combinedSecret)) {
    //   errors.wordsecret = "Word secret must contain only letters and numbers"
    //   isValid = false
    // } else if (!/[a-zA-Z]/.test(combinedSecret) || !/[0-9]/.test(combinedSecret)) {
    //   errors.wordsecret = "Word secret must contain a mix of letters and numbers"
    //   isValid = false
    // }

    if (!formData.newPassword) {
      errors.newPassword = "New password is required";
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.confirmPassword !== formData.newPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else if (formData.confirmPassword.length < 8) {
      errors.confirmPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    return [isValid, errors];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    // Add the combined word secret to form values
    const combinedWordSecret = combineWordSecrets();
    formValues.wordsecret = combinedWordSecret;

    const formObj: ResetPasswordFormData = {
      username: formValues.username || "",
      wordsecret: combinedWordSecret,
      newPassword: formValues.newPassword || "",
      confirmPassword: formValues.confirmPassword || "",
    };

    const [isValid, validationErrors] = validateForm(formValues, wordSecrets);
    if (isValid) {
      handleResetPassword(formObj);
      setErrors(null);
    } else {
      setErrors(validationErrors);
    }
  };

  // Create a grid of 6 rows with 4 inputs per row
  const renderWordSecretInputs = () => {
    const rows = [];
    for (let row = 0; row < 6; row++) {
      const inputs = [];
      for (let col = 0; col < 4; col++) {
        const index = row * 4 + col;
        inputs.push(
          <div key={index} className="px-1">
            <Input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={wordSecrets[index]}
              onChange={(e) => handleWordSecretChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(index, e)}
              maxLength={4}
              className="w-full py-2 px-2 text-center bg-gray-200 rounded text-gray-700 font-mono text-sm"
              placeholder={`----`}
            />
          </div>
        );
      }
      rows.push(
        <div key={row} className="flex gap-1 mb-2">
          {inputs}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <h1 className="text-2xl font-semibold text-center text-blue-500 mb-8">
          Reset Your Password
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
              <label className="block text-gray-700 mb-1">Word Secret</label>
              <div className="grid grid-cols-1 gap-2 p-4 bg-slate-100 shadow-sm border border-slate-200 rounded-lg">
                {renderWordSecretInputs()}
              </div>
              {errors?.wordsecret && (
                <p className="text-red-500 text-xs mt-1">{errors.wordsecret}</p>
              )}
            </div>

            <div className="mb-4 mt-4">
              <label htmlFor="newPassword" className="block text-gray-700 mb-1">
                New Password
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                className="w-full px-3 py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your new password"
              />
              {errors?.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div className="mb-4 mt-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="w-full px-3 py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Confirm your new password"
              />
              {errors?.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="mt-6 text-center text-sm text-gray-600 flex justify-end">
              <Link href="/login" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full flex items-center justify-center py-2 px-4 mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white font-large rounded-md transition-opacity"
            >
              <KeyRound className="w-5 h-5 mr-2" />
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
