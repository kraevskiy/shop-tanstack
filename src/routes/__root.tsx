import { createRootRouteWithContext, lazyRouteComponent } from "@tanstack/react-router";
import { UserData } from "@/hooks/use-user.store.ts";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
  user: UserData["user"];
  queryClient: QueryClient;
}>()({
  component: lazyRouteComponent(() => import('@/components/app')),
  notFoundComponent: () => {
    return <p>This is the notFoundComponent configured on root route</p>;
  },
});
