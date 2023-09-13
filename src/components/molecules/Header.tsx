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

export default function Header() {
  const { data, isAuthenticated } = useAuthenticatedSession();
  return (
    <header className="w-full sticky top-0 bg-slate-50 body-font border-b">
      <div className="container h-16 flex text-black flex-col items-start justify-between mx-auto md:flex-row md:items-center rounded-3xl">
        <a className="flex items-center mb-4 text-xl font-semibold text-black title-font md:mb-0">
          EasyPack
        </a>
        <nav className="flex flex-wrap items-center justify-center pl-24 text-black md:ml-auto md:mr-auto">
          <a className="mr-5 font-medium hover:text-gray-900">Home</a>
          <Link
            className="mr-5 font-medium hover:text-gray-900"
            href="/customer/order-parcel"
          >
            Request parcel
          </Link>
          <a className="font-medium hover:text-gray-900">Contact</a>
        </nav>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>{data?.email}</DropdownMenuLabel>
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
              className="bg-black py-2 px-3 rounded-3xl text-white"
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
