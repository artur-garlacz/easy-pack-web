import { UserType } from "@/typings/user";
import type NextAuth, { type DefaultSession, type DefaultJWT } from "next-auth";

interface UserData {
  data: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "COURIER" | "OWNER";
  };
  type: UserType;
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & UserData;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    data?: UserData;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: any;
  }
}
