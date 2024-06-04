import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen.ts";
import { RouterProvider, createRouter, ErrorComponent } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Spinner from "@/components/spinner.tsx";

import "@/styles/index.css";
import { useUserStore } from "@/hooks/use-user.store.ts";

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    user: undefined!,
  },
  defaultPendingComponent: () => (
    <div className="flex w-full justify-center p-2 text-2xl">
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const { user } = useUserStore();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        defaultPreload="intent"
        router={router}
        context={{
          user,
        }}
      />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
