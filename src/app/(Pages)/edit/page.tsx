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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import {
  editProfileSchema,
  editProfileSchemaType,
} from "@/schema/profile.schema";
import getMyToken from "@/utilities/getMyToken";
export default function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<editProfileSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(editProfileSchema),
  });
  async function handleEdit(values: editProfileSchemaType) {
    const token = await getMyToken();
    if (!token) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe",
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { token, "Content-Type": "application/json" },
        }
      );
      const payload = await res.json();
      if (res.ok) {
        toast.success("You have edited your profile successfully!", {
          position: "top-center",
          duration: 3000,
          style: {
            backgroundImage:
              "linear-gradient(23deg,rgba(0, 188, 125, 1) 0%, rgba(77, 191, 109, 1) 50%, rgba(0, 188, 125, 1) 100%)",
            color: "white",
            fontSize: "16px",
          },
        });
        form.reset();
        setIsLoading(false);
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
          <h5 className="sm:text-2xl text-lg">Edit here:</h5>
          <div className="py-3">
            <Form {...form}>
              <form
                className="flex flex-col gap-y-6"
                onSubmit={form.handleSubmit(handleEdit)}
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
                <button
                  disabled={isLoading}
                  className="bg-emerald-500 cursor-pointer hover:bg-emerald-400 disabled:bg-gray-700 text-2xl text-white rounded-lg py-1 flex justify-center items-center"
                >
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" size={30} />
                  ) : (
                    `Edit`
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
