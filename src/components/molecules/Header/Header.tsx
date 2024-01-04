import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/DropdownMenu";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { UserType } from "@/typings/user";
import { Button } from "@/components/atoms/Button";

export default function Header() {
  const { user, isAuthenticated } = useAuthenticatedSession();
  return (
    <header className="w-full sticky top-0 z-50 bg-slate-50 body-font border-b">
      <div className="container h-16 flex text-black flex-col items-start justify-between mx-auto md:flex-row md:items-center rounded-3xl">
        <a className="flex items-center mb-4 text-xl font-semibold text-black title-font md:mb-0">
          EasyPack
        </a>
        <nav className="flex flex-wrap items-center justify-center pl-24 text-black md:ml-auto md:mr-auto">
          <Link className="mr-5 font-medium hover:text-gray-900" href="/">
            Home
          </Link>
          <Link
            className="mr-5 font-medium hover:text-gray-900"
            href="/customer/order-parcel"
          >
            Request parcel
          </Link>
        </nav>
        {isAuthenticated && user?.type === UserType.CUSTOMER ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/customer/my-requests">My requests</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              className="bg-white py-2 px-3 rounded-3xl text-black"
              href="/customer/auth/signin"
            >
              Sign in
            </Link>
            <Link
              style={{ backgroundColor: "rgba(168, 196, 154,1)" }}
              className=" py-2 px-3 rounded-3xl text-white"
              href="/customer/auth/signup"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
