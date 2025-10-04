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
import { forgottenpassSchema, forgottenpassSchemaType } from "@/schema/Forgottenpass.schema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
export default function Forgottenpass() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<forgottenpassSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgottenpassSchema),
  });
  async function handleRegister(values: forgottenpassSchemaType) {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      if (res.data.statusMsg === "success") {
        toast.success("We have sent you a reset code!", {
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
        router.push("/resetcode");
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
          <h5 className="sm:text-2xl text-lg text-center">Account Recovery</h5>
          <div className="py-3">
            <Form {...form}>
              <form
                className="flex flex-col gap-y-6"
                onSubmit={form.handleSubmit(handleRegister)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sm:text-xl text-sm font-light text-black">
                        Email :
                      </FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
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
                    `Send Reset Code`
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
