"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import getMyToken from "@/utilities/getMyToken";
import {
  changePasswordSchema,
  changePasswordSchemaType,
} from "@/schema/changepass.schema";
import { signOut } from "next-auth/react";
import Link from "next/link";
export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<changePasswordSchemaType>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });
  async function handleEdit(values: changePasswordSchemaType) {
    const token = await getMyToken();
    if (!token) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { token, "Content-Type": "application/json" },
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
  }
  return (
    <>
      <div className="mt-4 md:w-3/4 lg:w-1/2 mx-auto p-3">
        <div
          className="w-full backdrop-blur-xs
        p-6 rounded-xl border-2 shadow-[0px_0px_40px_-4px_rgba(0,_0,_0,_0.8)]"
        >
          <h5 className="sm:text-2xl text-lg">Change Password here:</h5>
          <div className="py-3">
            <Form {...form}>
              <form
                className="flex flex-col gap-y-6"
                onSubmit={form.handleSubmit(handleEdit)}
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sm:text-xl text-sm font-light text-black">
                        Old password:
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sm:text-xl text-sm font-light text-black">
                        New password:
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
                        New repassword
                      </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link href="/forgottenpass" className="text-blue-500 hover:underline-offset-2 hover:underline">Forgot your password ?</Link>
                <button
                  disabled={isLoading}
                  className="bg-emerald-500 cursor-pointer hover:bg-emerald-400 disabled:bg-gray-700 text-2xl text-white rounded-lg py-1 flex justify-center items-center"
                >
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" size={30} />
                  ) : (
                    `Change Password`
                  )}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
