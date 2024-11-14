"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Form.Root onSubmit={handleSubmit} className="w-[260px]">
                    {/* Username Field */}
                    <Form.Field className="mb-2.5 grid" name="username">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                Username
                            </Form.Label>
                            <Form.Message
                                className="text-[13px] text-black opacity-80"
                                match="valueMissing"
                            >
                                Please enter your username
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
            </Form.Root>
   
        </div>
    )
}

export default Signup;