"use client";
import React, { useState } from "react";
import SingleProduct from "../SingleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";
import { subcategoryType } from "@/types/subcategory";
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  filterCategoriesSchema,
  filterCategoriesSchemaType,
} from "@/schema/filterCategories.schema";
import { ListFilter } from "lucide-react";
import getSpecifcSubcategoryProducts from "@/api/specificSubcategory.api";
export default function SortableCategoryProducts({
  categoryProducts,
  subCategories,
}: {
  categoryProducts: ProductType[];
  subCategories: subcategoryType[];
}) {
  const [products, setProducts] = useState<ProductType[]>(categoryProducts);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<filterCategoriesSchemaType>({
    defaultValues: {
      subcategory: "",
    },
    resolver: zodResolver(filterCategoriesSchema),
  });
  const { isDirty } = form.formState;
  async function handleFilter(values: filterCategoriesSchemaType) {
    setIsLoading(true);
    const subCategoryProducts = await getSpecifcSubcategoryProducts(
      values.subcategory
    );
    setProducts(subCategoryProducts);
    setIsLoading(false);
  }
  return (
    <>
      {isLoading ? (
        <div className="h-[90vh] flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="container mx-auto flex flex-col gap-y-4 py-6">
          {subCategories.length !== 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="border-2 w-11/12 sm:w-1/2 flex items-center justify-center gap-x-2 bg-emerald-100/90 mx-auto rounded-xl py-1 text-xl hover:text-white hover:bg-emerald-500 duration-300 cursor-pointer">
                  Filter <ListFilter />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filter Category</DialogTitle>
                  <DialogDescription>
                    choose subcategory that you want to see its products
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    className="flex h-full flex-col gap-y-4 px-4"
                    onSubmit={form.handleSubmit(handleFilter)}
                  >
                    <div>
                      <FormField
                        control={form.control}
                        name="subcategory"
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
                                  {subCategories.map((subCat) => (
                                    <FormItem
                                      key={subCat._id}
                                      className="flex items-center"
                                    >
                                      <FormControl>
                                        <RadioGroupItem
                                          className="border-emerald-500 cursor-pointer"
                                          value={subCat._id}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer sm:text-sm text-[10px]">
                                        {subCat.name}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button className="cursor-pointer" variant="outline">
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <button
                          type="submit"
                          disabled={!isDirty}
                          className="max-sm:text-sm border-2 px-8 bg-emerald-100/40 rounded-xl py-1 text-xl hover:text-white hover:bg-emerald-500 duration-300 cursor-pointer disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
                        >
                          Filter
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}

          {products.length !== 0 ? (
            <div className="flex flex-wrap gap-y-3 ">
              {products.map((currentProduct, index) => (
                <SingleProduct
                  key={currentProduct.id}
                  index={index}
                  product={currentProduct}
                />
              ))}
            </div>
          ) : (
            <div className="h-[70vh] flex justify-center items-center">
              <h6 className="text-4xl font-light flex items-center gap-x-2">
                No Products Found{" "}
                <Frown className="text-emerald-500" size={50} />
              </h6>
            </div>
          )}
        </div>
      )}
    </>
  );
}
