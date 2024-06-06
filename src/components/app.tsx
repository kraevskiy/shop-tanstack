import { useEffect } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { useUserQuery } from "@/lib/queries.ts";
import { ELocalStorage } from "@/types/local-storage-enum.ts";
import { useUserStore } from "@/hooks/use-user.store.ts";
import { ThemeProvider } from "@/components/providers/theme.provider.tsx";
import { cn } from "@/lib/utils.ts";
import Spinner from "@/components/spinner.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import ModalProvider from "@/components/providers/modal.provider.tsx";
import Header from "@/components/header.tsx";

const App = () => {
  const { data, isFetching, isLoading, isError } = useUserQuery(localStorage.getItem(ELocalStorage.token) ?? "");
  const { logIn } = useUserStore();
  const isLoadingRoute = useRouterState({ select: (s) => s.status === "pending" });

  useEffect(() => {
    if (!isError && data) {
      logIn(data);
    }
  }, [isError, data]);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="relative flex h-svh flex-col gap-1 bg-background">
        <div
          className={cn(
            "fixed left-1/2 top-0 z-[100] flex -translate-x-1/2 -translate-y-10 justify-center rounded-b-2xl border bg-background px-5 py-1 transition-all",
            (isFetching || isLoading || isLoadingRoute) && "translate-y-0",
          )}
        >
          <Spinner show={isFetching || isLoading || isLoadingRoute} />
        </div>
        <Header />
        <main className="container flex-1 py-3">
          <Outlet />
        </main>
        <Toaster />
      </div>
      <ModalProvider />
      {import.meta.env.DEV && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-right" />
          <TanStackRouterDevtools />
        </>
      )}
    </ThemeProvider>
  );
};

export default App;
