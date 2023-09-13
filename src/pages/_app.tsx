import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { ReactNode, useState } from "react";
// import { Favicon } from "components/atoms/Favicon/Favicon";
import themeExtension from "@/styles/chakraTheme";
import "./globals.css";
import Header from "@/components/molecules/Header";
import { Toast, ToastProvider } from "@/components/atoms/Toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session; dehydratedState: QueryClient }>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <SessionProvider session={session}>
        <SessionLoadingGuard>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ChakraProvider theme={themeExtension}>
                {/* <Fonts /> */}
                <Header />
                <Component {...pageProps} />
                <ToastProvider>
                  <Toast />
                </ToastProvider>
              </ChakraProvider>
            </Hydrate>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </SessionLoadingGuard>
      </SessionProvider>
    </>
  );
}

const SessionLoadingGuard = ({ children }: { children: ReactNode }) => {
  const sessionData = useSession();
  if (sessionData.status === "loading") {
    return null;
  }

  return <>{children}</>;
};
