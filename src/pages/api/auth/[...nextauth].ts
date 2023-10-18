import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "CustomerCredentials",
      name: "CustomerCredentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "[email protected]",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const res = await fetch("http://localhost:8000/api/customers/sign-in", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const token = await res.json();

        if (!res.ok) {
          throw new Error(token.message);
        }
        // If no error and we have user data, return it
        if (res.ok && token) {
          const customerResponse = await getCustomerData(
            token?.accessToken as string
          );

          return { ...token, data: customerResponse, type: "CUSTOMER" };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    CredentialsProvider({
      id: "UserCredentials",
      name: "UserCredentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "[email protected]",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const res = await fetch("http://localhost:8000/api/users/sign-in", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const token = await res.json();

        if (!res.ok) {
          throw new Error(token.message);
        }
        // If no error and we have user data, return it
        if (res.ok && token) {
          const userResponse = await getUserData(token?.accessToken as string);

          if (!userResponse) {
            return null;
          }

          return { ...token, data: userResponse, type: "DELIVERY" };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    CognitoProvider({
      clientId: process.env.AWS_COGNITO_CLIENT_ID as string,
      clientSecret: process.env.AWS_COGNITO_CLIENT_SECRET as string,
      issuer: process.env.AWS_COGNITO_ISSUER as string,
    }),
  ],
  pages: {
    signIn: "/panel/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!token.user && user?.data) {
        token.user = {
          ...user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  cookies: {
    state: {
      name: "next-auth.state",
      options: {
        maxAge: 60 * 60, // 1 hour
        path: "/",
        sameSite: "lax",
        secure: true,
      },
    },
  },
};

export default NextAuth(authOptions);

const getCustomerData = async (token: string): Promise<any | null> => {
  const queryString = `${process.env.BACKEND_URL}api/customers/me`;

  const response: Response = await fetch(queryString, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await response.json();

  if (response.status === 200) {
    return res;
  }

  if (response.status === 404) {
    console.log("Customer not exists");
  }

  return null;
};

const getUserData = async (token: string): Promise<any | null> => {
  const queryString = `${process.env.BACKEND_URL}api/users/me`;

  const response: Response = await fetch(queryString, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await response.json();

  if (response.status === 200) {
    return res;
  }

  if (response.status === 404) {
    console.log("User not exists");
  }

  return null;
};
