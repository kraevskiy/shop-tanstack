import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  beforeLoad: ({ context }) => {
    if (context.user !== null) {
      throw redirect({ to: "/profile" });
    }
  },
  component: () => <Navigate to="/auth/login" />,
});
