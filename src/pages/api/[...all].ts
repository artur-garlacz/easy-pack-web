/* eslint-disable import/no-anonymous-default-export */
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
  },
};

// Proxy middleware will grab everything after `/api/`, except the /api/auth and proxy it to the target
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  // if (!session && req.url !== "/api/health") {
  //   return res.status(401).send({ message: "Unauthorized" });
  // }

  const proxyMiddleware = httpProxyMiddleware(req, res, {
    target: process.env.BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: session?.user.accessToken
        ? `Bearer ${session?.user.accessToken}`
        : "",
    },
  });

  return proxyMiddleware;
};
