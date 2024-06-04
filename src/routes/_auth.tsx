import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/auth/login",
      });
    }

    return {
      user: context.user,
    };
  },
});
