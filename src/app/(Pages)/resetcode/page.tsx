"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const FormSchema = z.object({
  resetCode: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
export default function InputOTPForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      resetCode: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        data
      );
      if (res.data.status === "Success") {
        toast.success("You can Change your password now!", {
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
        router.push("/newpass");
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
    <div className="mt-4 md:w-3/4 lg:w-1/2 mx-auto p-3">
      <div
        className="w-full backdrop-blur-xs
        p-6 rounded-xl border-2 shadow-[0px_0px_40px_-4px_rgba(0,_0,_0,_0.8)]"
      >
        <h5 className="sm:text-2xl text-lg text-center">Reset Code</h5>
        <div className="py-3 flex justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6 flex justify-center flex-col"
            >
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
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
  );
}
