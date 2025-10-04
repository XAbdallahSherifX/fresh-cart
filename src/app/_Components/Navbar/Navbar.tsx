"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Heart,
  LogOut,
  ShoppingBasket,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { WishlistContext } from "@/contexts/WishlistContext";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const { data: session, status } = useSession();
  const { numOfCartProd } = useContext(CartContext);
  const { numOfWishlistProd } = useContext(WishlistContext);
  const path = usePathname();
  return (
    <header className="w-full bg-white shadow-lg">
      <div className="md:w-11/12 mx-auto flex h-16 w-full items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-semibold hover:text-emerald-600 duration-300"
          prefetch={false}
        >
          <ShoppingCart className="text-emerald-600" />
          <h1>FreshCart</h1>
          <span className="sr-only">Fresh Cart</span>
        </Link>
        <nav className="hidden items-center gap-6 text-lg font-normal lg:flex">
          <Link
            href="/"
            className={`hover:text-emerald-600 duration-300 ${
              path === "/" ? "text-emerald-600" : ""
            }`}
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`hover:text-emerald-600 duration-300 ${
              path === "/products" ? "text-emerald-600" : ""
            }`}
            prefetch={false}
          >
            Products
          </Link>
          <Link
            href="/categories"
            className={`hover:text-emerald-600 duration-300 ${
              path === "/categories" ? "text-emerald-600" : ""
            }`}
            prefetch={false}
          >
            Categories
          </Link>
          <Link
            href="/brands"
            className={`hover:text-emerald-600 duration-300 ${
              path === "/brands" ? "text-emerald-600" : ""
            }`}
            prefetch={false}
          >
            Brands
          </Link>
        </nav>
        <div className="flex gap-x-4 items-center">
          <div className="lg:flex gap-x-2 items-center hidden">
            <ul className="flex gap-x-4">
              <li className="border-r-2 pr-2 border-gray-400">
                <Link
                  href="/wishlist"
                  className={`flex items-center gap-2 hover:text-emerald-600 duration-300 relative ${
                    path === "/wishlist" ? "text-emerald-600" : ""
                  }`}
                  prefetch={false}
                >
                  Wishlist
                  <Heart />
                  {numOfWishlistProd !== 0 && (
                    <h6 className="text-white absolute top-[-15px] right-[-5px] px-1 rounded-full bg-emerald-500 flex justify-center items-center">
                      {numOfWishlistProd}
                    </h6>
                  )}
                </Link>
              </li>
              <li className="border-r-2 pr-2 border-gray-400">
                <Link
                  href="/cart"
                  className={`flex items-center gap-2 hover:text-emerald-600 duration-300 relative ${path==="/cart"?"text-emerald-600":""}`}
                  prefetch={false}
                >
                  Cart <ShoppingBasket />
                  {numOfCartProd !== 0 && (
                    <h6 className="text-white absolute top-[-15px] right-[-5px] px-1 rounded-full bg-emerald-500 flex justify-center items-center">
                      {numOfCartProd}
                    </h6>
                  )}
                </Link>
              </li>
            </ul>
            {!session && (
              <>
                <Button className="cursor-pointer text-black hover:bg-emerald-600 bg-transparent border-2 border-emerald-500 hover:text-white duration-300">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button className="cursor-pointer bg-emerald-600 hover:bg-transparent border-2 border-emerald-500 hover:text-black duration-300">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center gap-x-4">
            {session && (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full border-1 cursor-pointer border-emerald-700"
                    >
                      <h1
                        className="rounded-full text-lg text-emerald-500"
                        style={{ aspectRatio: "32/32", objectFit: "cover" }}
                      >
                        {session.user.name[0]}
                      </h1>
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <Link href="/profile">
                      <DropdownMenuItem className={`cursor-pointer duration-300  text-lg group hover:!text-emerald-600 flex items-center font-semibold ${path==="/profile"?"text-emerald-600":""}`}>
                        <h1>Profile</h1>
                        <User className="group-hover:text-emerald-600 duration-300" />
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/allorders">
                      <DropdownMenuItem className={`cursor-pointer duration-300 text-lg group hover:!text-emerald-600 flex items-center font-semibold ${path==="/allorders"?"text-emerald-600":""}`}>
                        <h1>Orders</h1>
                        <Truck className="group-hover:text-emerald-600 duration-300" />
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="cursor-pointer duration-300 text-lg group hover:!text-red-500 flex items-center font-semibold"
                    >
                      <h1>Logout</h1>
                      <LogOut className="group-hover:text-red-500 duration-300" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden cursor-pointer"
                >
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <div className="flex flex-col gap-6 px-4 py-6">
                  <div className="flex items-center gap-2 text-2xl font-semibold hover:text-emerald-600 duration-300">
                    <ShoppingCart
                      className="text-emerald-600"
                      strokeWidth={1.25}
                    />
                    <h1>Fresh Cart</h1>
                    <span className="sr-only">FreshCart</span>
                  </div>
                  <nav className="grid gap-2">
                    <Link
                      href="/"
                      className={`flex gap-2 my-2 text-lg font-medium hover:text-emerald-600 duration-300 ${
                        path === "/" ? "text-emerald-600" : ""
                      }`}
                      prefetch={false}
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      className={`flex gap-2 my-2 text-lg font-medium hover:text-emerald-600 duration-300 ${
                        path === "/products" ? "text-emerald-600" : ""
                      }`}
                      prefetch={false}
                    >
                      Products
                    </Link>
                    <Link
                      href="/categories"
                      className={`flex gap-2 my-2 text-lg font-medium hover:text-emerald-600 duration-300 ${
                        path === "/categories" ? "text-emerald-600" : ""
                      }`}
                      prefetch={false}
                    >
                      Categories
                    </Link>
                    <Link
                      href="/brands"
                      className={`flex gap-2 my-2 text-lg font-medium hover:text-emerald-600 duration-300 ${
                        path === "/brands" ? "text-emerald-600" : ""
                      }`}
                      prefetch={false}
                    >
                      Brands
                    </Link>
                    <hr className="my-2" />
                    <Link
                      href="/wishlist"
                      className={`flex gap-2 my-2 text-lg font-medium hover:text-emerald-600 duration-300 items-center ${
                        path === "/wishlist" ? "text-emerald-600" : ""
                      }`}
                      prefetch={false}
                    >
                      Wishlist
                      <Heart />
                      {numOfWishlistProd !== 0 && (
                        <h6 className=" text-white size-5 rounded-full bg-emerald-500 flex justify-center items-center">
                          {numOfWishlistProd}
                        </h6>
                      )}
                    </Link>
                    <Link
                      href="/cart"
                      className={`flex gap-2 my-2 text-lg font-medium hover:text-emerald-600 duration-300 items-center ${
                        path === "/cart" ? "text-emerald-600" : ""
                      }`}
                      prefetch={false}
                    >
                      Cart <ShoppingBasket />
                      {numOfCartProd !== 0 && (
                        <h6 className=" text-white size-5 rounded-full bg-emerald-500 flex justify-center items-center">
                          {numOfCartProd}
                        </h6>
                      )}
                    </Link>
                    {!session && (
                      <>
                        <Button className="cursor-pointer text-black hover:bg-emerald-600 bg-transparent border-2 border-emerald-500 hover:text-white duration-300">
                          <Link href="/login">Log In</Link>
                        </Button>
                        <Button className="cursor-pointer bg-emerald-600 hover:bg-transparent border-2 border-emerald-500 hover:text-black duration-300">
                          <Link href="/register">Register</Link>
                        </Button>
                      </>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
function MenuIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
