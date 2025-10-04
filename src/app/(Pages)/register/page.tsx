"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { registerSchema, registerSchemaType } from "@/schema/register.schema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });
  async function handleRegister(values: registerSchemaType) {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (res.data.message === "success") {
        toast.success("You have signed up successfully!", {
          position: "top-center",
          duration: 3000,
          style: {
            backgroundImage:
              "linear-gradient(23deg,rgba(0, 188, 125, 1) 0%, rgba(77, 191, 109, 1) 50%, rgba(0, 188, 125, 1) 100%)",
            color: "white",
            fontSize: "16px",
          },
        });
        setIsLoading(false);
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `${error.response?.data?.message ?? "Something went wrong"}!`,
          {
            position: "top-center",
            duration: 3000,
            style: {
              backgroundImage:
                "linear-gradient(23deg, rgba(220, 38, 38, 1) 0%, rgba(239, 68, 68, 1) 50%, rgba(220, 38, 38, 1) 100%)",
              color: "white",
              fontSize: "16px",
            },
          }
        );
      } else {
        toast.error("Unexpected error occurred!", {
          position: "top-center",
          duration: 3000,
          style: {
            backgroundImage:
              "linear-gradient(23deg, rgba(220, 38, 38, 1) 0%, rgba(239, 68, 68, 1) 50%, rgba(220, 38, 38, 1) 100%)",
            color: "white",
            fontSize: "16px",
          },
        });
      }
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="mt-4 md:w-3/4 lg:w-1/2 mx-auto p-3">
        <div
          className="w-full backdrop-blur-xs
        p-6 rounded-xl border-2 shadow-[0px_0px_40px_-4px_rgba(0,_0,_0,_0.8)]"
        >
          <h5 className="sm:text-2xl text-lg">
            Welcome to FreshCart, Sign up here:
          </h5>
          <div className="py-3">
            <Form {...form}>
              <form
                className="flex flex-col gap-y-6"
                onSubmit={form.handleSubmit(handleRegister)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sm:text-xl text-sm font-light text-black">
                        Name:
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sm:text-xl text-sm font-light text-black">
                        Email:
                      </FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sm:text-xl text-sm font-light text-black">
                        Password:
                      </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sm:text-xl text-sm font-light text-black">
                        RePassword:
                      </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sm:text-xl text-sm font-light text-black">
                        Phone:
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  className="bg-emerald-500 cursor-pointer hover:bg-emerald-400 disabled:bg-gray-700"
                >
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    `Sign Up`
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
