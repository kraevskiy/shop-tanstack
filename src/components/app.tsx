import { Outlet, useRouterState } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useShallow } from "zustand/react/shallow";

import { useUserStore } from "@/hooks/use-user.store.ts";
import { ThemeProvider } from "@/components/providers/theme.provider.tsx";
import { cn } from "@/lib/utils.ts";
import Spinner from "@/components/spinner.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import ModalProvider from "@/components/providers/modal.provider.tsx";
import Header from "@/components/header.tsx";
import { useEffect } from 'react';

const App = () => {
  const { isInitialLoading, getUser } = useUserStore(
    useShallow((state) => ({
      isInitialLoading: state.isInitialLoading,
      getUser: state.getUser
    })),
  );
  const isLoadingRoute = useRouterState({ select: (s) => s.status === "pending" });

  useEffect(() => {
    if (isInitialLoading) {
      getUser()
    }
  }, [isInitialLoading])

  if (isInitialLoading) {
    return (
      <div className="flex justify-center">
        <div className={cn("mx-auto flex justify-center rounded-2xl border bg-background p-5 transition-all")}>
          <Spinner show={true} />
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="relative flex h-svh flex-col gap-1 bg-background">
        <div
          className={cn(
            "fixed left-1/2 top-0 z-[100] flex -translate-x-1/2 -translate-y-10 justify-center rounded-b-2xl border bg-background px-5 py-1 transition-all",
            isLoadingRoute && "translate-y-0",
          )}
        >
          <Spinner show={isLoadingRoute} />
        </div>
        <Header />
        <main className="container max-w-screen-2xl flex-1 py-3">
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
