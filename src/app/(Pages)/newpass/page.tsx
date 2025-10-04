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
import { signIn, signOut } from "next-auth/react";
import { newPassSchema, newPassSchemaType } from "@/schema/newPass.schema";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<newPassSchemaType>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(newPassSchema),
  });
  async function handleLogin(values: newPassSchemaType) {
    setIsLoading(true);
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        }
      );
      const payload = await res.json();
      if (res.ok) {
        toast.success("You have changed your password successfully!", {
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
        await signOut({ callbackUrl: "/login" });
      } else {
        throw new Error(payload.errors.msg || "Something went wrong");
      }
    } catch (error) {
      toast.error(`${error}!`, {
        position: "top-center",
        duration: 3000,
        style: {
          backgroundImage:
            "linear-gradient(23deg, rgba(220, 38, 38, 1) 0%, rgba(239, 68, 68, 1) 50%, rgba(220, 38, 38, 1) 100%)",
          color: "white",
          fontSize: "16px",
        },
      });

      setIsLoading(false);
    }
    setIsLoading(false);
  }
  return (
    <>
      <div className="mt-4 md:w-3/4 lg:w-1/2 mx-auto p-3">
        <div
          className="w-full backdrop-blur-xs
        p-6 rounded-xl border-2 shadow-[0px_0px_40px_-4px_rgba(0,_0,_0,_0.8)]"
        >
          <h5 className="sm:text-2xl text-lg">Enter the email and the new password:</h5>
          <div className="py-3">
            <Form {...form}>
              <form
                className="flex flex-col gap-y-6"
                onSubmit={form.handleSubmit(handleLogin)}
              >
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
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sm:text-xl text-sm font-light text-black">
                        New Password:
                      </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  className="bg-emerald-500 cursor-pointer hover:bg-emerald-400 disabled:bg-gray-700 text-lg"
                >
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    `Change Password`
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
