"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Lottie from "lottie-react";
import Animation from "../../assets/lottie/Animation.json";

const Signup = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/passkey")
        
        // console.log(e);
        // const form = e.target as HTMLFormElement;
        // const name = form.elements.namedItem("name") as HTMLInputElement;
        // const nameValue = name.value;
        // console.log(nameValue);
        // const email = form.elements.namedItem("email") as HTMLInputElement;
        // const emailValue = email.value;
        // const password = form.elements.namedItem("password") as HTMLInputElement;
        // const passwordValue = password.value;
        // if (nameValue === "") {
        //     setIsLoading(true);
        //     setTimeout(() => {
        //         setIsLoading(false);
        //         window.location.href = "/";
        //     }, 1000);
        // }
      };
    return (
        <div className=" p-10 min-h-screen flex items-center justify-center gap-20 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))]

from-[#fef7dc]
via-[#e6ddc6]
to-[#c2b8a3]">
            <div className="flex flex-col items-center justify-center p-10 shadow-xl shadow-black/20 rounded-md w-[350px]">
                <h1 className="text-2xl font-bold text-black">
                    Create an account
                </h1>
                <p className="text-sm p-2 text-gray-500 text-center">
                Access all that Crypto Wallet has to offer with a single account
                </p>
                <Form.Root onSubmit={handleSubmit} className=" w-[260px]">
                        {/* Username Field */}
                        <Form.Field className="mb-2.5 grid" name="username">
                            <div className="  flex items-baseline justify-between">
                                <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                    Email
                                </Form.Label>
                                <Form.Message
                                    className="text-[13px] text-black opacity-80"
                                    match="valueMissing"
                                >
                                    Your email is required
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <input
                                    className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-black hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                                    type="text"
                                    required
                                />
                            </Form.Control>
                        </Form.Field>
                    <Form.Submit asChild>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                        </>
                    ) : (
                        "Sign up"
                    )}
                        </Button>
                    </Form.Submit>
                    <p className="text-sm p-2 text-gray-500 text-center">
                        Already have an account? <Link className="text-blue-500" href="/login">Login</Link>
                    </p>
                </Form.Root>
            </div>
            <div className="flex flex-col items-center justify-center mb-12 h-[80px]">
                <Lottie animationData={Animation} loop={true} style={{ width: 500, height: 500 }} />
            </div>
   
        </div>
    )
}

export default Signup;