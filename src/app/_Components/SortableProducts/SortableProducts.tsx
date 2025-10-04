"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { filterProductsSchema, filterProductsSchemaType } from "@/schema/filterProducts.schema";
import { ProductType } from "@/types/product.type";
import SingleProduct from "../SingleProduct/SingleProduct";
import { Frown, ListFilter } from "lucide-react";
import  PaginationComponent  from "../Pagination/Pagination";
export default function SortableProducts({
  initialProducts,
}: {
  initialProducts: { data: ProductType[]; metadata: { numberOfPages: number } };
}) {
  const [products, setProducts] = useState(initialProducts.data);
  const [pages, setPages] = useState(initialProducts.metadata.numberOfPages);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const form = useForm<filterProductsSchemaType>({
    defaultValues: {
      accordingTo: searchParams.get("sort") || "",
      minPrice: searchParams.get("price[gte]") || "",
      maxPrice: searchParams.get("price[lte]") || "",
      category: searchParams.get("category[in]") || "",
    },
    resolver: zodResolver(filterProductsSchema),
  });
  const { isDirty } = form.formState;
  useEffect(() => {
    setProducts(initialProducts.data);
    setPages(initialProducts.metadata.numberOfPages);
  }, [initialProducts]);
  function handleFilter(values: filterProductsSchemaType) {
    const params = new URLSearchParams(searchParams);
    if (values.accordingTo) params.set("sort", values.accordingTo);
    else params.delete("sort");
    if (values.minPrice) params.set("price[gte]", values.minPrice);
    else params.delete("price[gte]");
    if (values.maxPrice) params.set("price[lte]", values.maxPrice);
    else params.delete("price[lte]");
    if (values.category) params.set("category[in]", values.category);
    else params.delete("category[in]");
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  }
 function handlePageChange(newPage: number) {
   const params = new URLSearchParams(searchParams);
   params.set("page", newPage.toString());
   router.push(`/products?${params.toString()}`);
 }
  return (
    <>
      <div className="container mx-auto flex flex-col gap-y-4 py-6">
        <Sheet>
          <SheetTrigger asChild>
            <button className="border-2 w-11/12 sm:w-1/2 flex items-center justify-center gap-x-2 bg-emerald-100/90 mx-auto rounded-xl py-1 text-xl hover:text-white hover:bg-emerald-500 duration-300 cursor-pointer">
              Filter <ListFilter />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="pb-0">
              <SheetTitle>Filter Products</SheetTitle>
              <SheetDescription>
                Filter products according to the next filter options
              </SheetDescription>
            </SheetHeader>
            <hr />
            <Form {...form}>
              <form
                className="flex h-full flex-col gap-y-4 px-4"
                onSubmit={form.handleSubmit(handleFilter)}
              >
                <div>
                  <FormField
                    control={form.control}
                    name="accordingTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-wrap justify-between"
                          >
                            <FormItem className="flex items-center w-47/100">
                              <FormControl>
                                <RadioGroupItem
                                  className="border-emerald-500 cursor-pointer"
                                  value="+price"
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                Price: Low to High
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center w-47/100">
                              <FormControl>
                                <RadioGroupItem
                                  className="border-emerald-500 cursor-pointer"
                                  value="-price"
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                Price: High to Low
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center w-47/100">
                              <FormControl>
                                <RadioGroupItem
                                  className="border-emerald-500 cursor-pointer"
                                  value="+title"
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                Title: From A to Z
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center w-47/100">
                              <FormControl>
                                <RadioGroupItem
                                  className="border-emerald-500 cursor-pointer"
                                  value="-title"
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                Title: From Z to A
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <hr className="my-2" />
                  <div className="flex gap-x-5">
                    <FormField
                      control={form.control}
                      name="minPrice"
                      render={({ field }) => (
                        <FormItem className="w-11/12">
                          <FormLabel className="font-normal text-black justify-center">
                            minimum price
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
                      name="maxPrice"
                      render={({ field }) => (
                        <FormItem className="w-11/12">
                          <FormLabel className="font-normal justify-center text-black">
                            maximum price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                form.trigger("minPrice");
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <hr className="my-2" />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormLabel className="sm:text-xl text-sm font-light text-black mb-1">
                              Categories:
                            </FormLabel>
                            <div className="flex flex-col gap-y-1.5">
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-emerald-500 cursor-pointer"
                                    value="6439d40367d9aa4ca97064cc"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                  Baby & Toys
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-emerald-500 cursor-pointer"
                                    value="6439d30b67d9aa4ca97064b1"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                  Beauty & Health
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-emerald-500 cursor-pointer"
                                    value="6439d3c867d9aa4ca97064ba"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                  Books
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-emerald-500 cursor-pointer"
                                    value="6439d2d167d9aa4ca970649f"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                  Electronics
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-emerald-500 cursor-pointer"
                                    value="6439d3e067d9aa4ca97064c3"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                  Home
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-emerald-500 cursor-pointer"
                                    value="6439d5b90049ad0b52b90048"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                  Men&apos;s Fashion
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-emerald-500 cursor-pointer"
                                    value="6439d2f467d9aa4ca97064a8"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                  Mobiles
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-emerald-500 cursor-pointer"
                                    value="6439d61c0049ad0b52b90051"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                  Music
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-emerald-500 cursor-pointer"
                                    value="6439d41c67d9aa4ca97064d5"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                  Super Market
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-emerald-500 cursor-pointer"
                                    value="6439d58a0049ad0b52b9003f"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                  Women&apos;s Fashion
                                </FormLabel>
                              </FormItem>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <SheetFooter className="px-0 py-2 m-0">
                  <button
                    type="submit"
                    disabled={!isDirty}
                    className="max-sm:text-sm border-2 bg-emerald-100/40 rounded-xl py-1 text-xl hover:text-white hover:bg-emerald-500 duration-300 cursor-pointer disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
                  >
                    Filter
                  </button>
                  <SheetClose asChild>
                    <button
                      type="button"
                      className="max-sm:text-sm border-2 duration-300 rounded-xl py-1 text-xl cursor-pointer font-normal hover:text-white hover:bg-red-500"
                    >
                      Close
                    </button>
                  </SheetClose>
                </SheetFooter>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
        {products.length === 0 ? (
          <div className="h-[70vh] flex justify-center items-center">
            <h6 className="text-4xl font-light flex items-center gap-x-2">
              No Products Found <Frown className="text-emerald-500" size={50} />
            </h6>
          </div>
        ) : (
          <div className="flex flex-wrap gap-y-3 ">
            {products.map((currentProduct, index) => (
              <SingleProduct
                key={currentProduct.id}
                index={index}
                product={currentProduct}
              />
            ))}
          </div>
        )}
        {pages > 1 && (
          <div className="mt-8">
            <PaginationComponent
              pageCount={pages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
}
