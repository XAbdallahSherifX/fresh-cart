"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Home, LoaderCircle, PlusCircle, Trash2, Truck } from "lucide-react";
import { addressSchema, addressSchemaType } from "@/schema/address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import getMyToken from "@/utilities/getMyToken";
import { toast } from "sonner";
import { AddressType } from "@/types/address.type";
import { Label } from "@/components/ui/label";
import { CartContext } from "@/contexts/CartContext";
import checkoutNow from "@/checkoutActions/checkoutNow";
import addAddress from "@/AddressActions/addAddress";
import removeAddress from "@/AddressActions/removeAddress";

export default function PaymentPage({
  addresses,
  id,
}: {
  addresses: AddressType[];
  id: string;
}) {
  const [sampleAddresses, setSampleAddresses] = useState(addresses);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>(
    addresses[0]?._id || ""
  );
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { totalCartPrice } = useContext(CartContext);
  const form = useForm<addressSchemaType>({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(addressSchema),
  });
  async function handleAddingAddress(values: addressSchemaType) {
    try {
      setIsLoading(true);
      const payload = await addAddress(values);
      if (payload.status === "success") {
        setSampleAddresses(payload.data);
        toast.success("Address has been added successfully!", {
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
        form.reset();
      } else {
        throw new Error(payload.errors?.msg || "Something went wrong");
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
  async function handleDeleteAddress(addressId: string) {
    try {
      setIsDeleting(addressId);
      const payload = await removeAddress(addressId);
      if (payload.status === "success") {
        setSampleAddresses(payload.data);
        if (selectedAddress === addressId) {
          setSelectedAddress("");
        }
        toast.success("Address has been removed successfully!", {
          position: "top-center",
          duration: 3000,
          style: {
            backgroundImage:
              "linear-gradient(23deg,rgba(0, 188, 125, 1) 0%, rgba(77, 191, 109, 1) 50%, rgba(0, 188, 125, 1) 100%)",
            color: "white",
            fontSize: "16px",
          },
        });
        setIsDeleting(null);
      } else {
        throw new Error(payload.message || "Failed to delete address");
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
      setIsDeleting(null);
    }
  }
  async function handleCheckout() {
    const fullAddress = sampleAddresses.find(
      (address) => address._id === selectedAddress
    );
    if (!fullAddress) {
      toast.error("Please select a valid address to proceed.", {
        position: "top-center",
        duration: 3000,
        style: {
          backgroundImage:
            "linear-gradient(23deg, rgba(220, 38, 38, 1) 0%, rgba(239, 68, 68, 1) 50%, rgba(220, 38, 38, 1) 100%)",
          color: "white",
          fontSize: "16px",
        },
      });
      return;
    }
    try {
      setIsCheckingOut(true);
      await checkoutNow(id, fullAddress);
      setIsCheckingOut(false);
    } catch (error) {
      toast.error("Checkout failed. Please try again.", {
        position: "top-center",
        duration: 3000,
        style: {
          backgroundImage:
            "linear-gradient(23deg, rgba(220, 38, 38, 1) 0%, rgba(239, 68, 68, 1) 50%, rgba(220, 38, 38, 1) 100%)",
          color: "white",
          fontSize: "16px",
        },
      });
      setIsCheckingOut(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-emerald-700">
                <Truck className="h-6 w-6" />
                Shipping Address
              </CardTitle>
              <CardDescription>
                Choose where you&apos;d like your order delivered or add a new
                address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue={selectedAddress}
                onValueChange={(value) => setSelectedAddress(value)}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                {sampleAddresses.map((address) => (
                  <div key={address._id} className="relative">
                    <Label
                      htmlFor={address._id}
                      className="flex cursor-pointer flex-col rounded-lg border bg-card p-4 text-card-foreground shadow-sm ring-offset-background has-[:checked]:border-emerald-500 has-[:checked]:ring-2 has-[:checked]:ring-emerald-400"
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value={address._id} id={address._id} />
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                            <Home className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-semibold">{address.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {address.city}, {address.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Label>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full cursor-pointer text-red-500 hover:bg-red-100 hover:text-red-600 ${
                        isDeleting === address._id ? "cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleDeleteAddress(address._id)}
                      disabled={isDeleting === address._id}
                    >
                      {isDeleting === address._id ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add a New Address
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add a new address</DialogTitle>
                    <DialogDescription>
                      Enter your shipping details here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      className="flex flex-col gap-y-4 pt-4"
                      onSubmit={form.handleSubmit(handleAddingAddress)}
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Home, Work"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="details"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Details</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Apt 5, Floor 2"
                                {...field}
                              />
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
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-emerald-600 cursor-pointer hover:bg-emerald-700"
                      >
                        {isLoading ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          `Save Address`
                        )}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-700">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{totalCartPrice} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>0.00 EGP</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes</span>
                  <span>0.00 EGP</span>
                </div>
                <Separator className="bg-emerald-100" />
                <div className="flex justify-between text-xl font-bold text-emerald-800">
                  <span>Total</span>
                  <span>{totalCartPrice} EGP</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCheckout}
                disabled={!selectedAddress || isCheckingOut}
                className="w-full cursor-pointer bg-emerald-600 text-lg hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-900/50"
              >
                {isCheckingOut ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
