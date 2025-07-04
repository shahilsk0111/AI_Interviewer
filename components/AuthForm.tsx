"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"

const authFormSchema = (type: FormType) => {
    return z.object({
        name:type==='sign-up'? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(6),
    })
}

const AuthForm = ({type}: {type : FormType}) => {   
    const router = useRouter()
    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
           if (type === "sign-up") {
             toast.success("Account created successfully!. Redirecting to sign in page...");
             router.push("/sign-in");
           } else {
            toast.success("Signed in successfully! Redirecting to home page...");
            router.push("/");
           }
        } catch (error) {
            console.log("Error submitting form:", error);
            toast.error("An error occurred while submitting the form. Please try again.");
        }
    }

    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-col justify-center gap-2 items-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38}/>
                    <h2 className="text-primary-100 "> IntelliPrep </h2>
                </div>
                <h3 >Practice job interview with AI</h3>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                    {!isSignIn && <FormField control={form.control} name="name" 
                    label="Name"
                    placeholder="Enter your name" 
                    />}
                    <FormField control={form.control} name="email" 
                    label="Email"
                    placeholder="Your email address" 
                    type = "email"
                    />
                    <FormField control={form.control} name="password" 
                    label="Password"
                    placeholder="Enter your password" 
                    type="password"
                    />
                    <Button type="submit" className="btn">{isSignIn ? 'Sign in' : 'Create an account'}</Button>
                </form>
            </Form>
            <p className="text-center">
                {isSignIn ? "Don't have an account?" : "Already have an account?"} 
                <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="text-user-primary font-bold ml-1" >
                {!isSignIn ? "Sign in" : "Sign up"}
                </Link>
            </p>
        </div>
        </div>
    )
}

export default AuthForm
