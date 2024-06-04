import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
  beforeLoad: ({ context }) => {
    if (context.user !== null) {
      throw redirect({ to: "/profile" });
    }
  },
});

export function RegisterPage() {
  return <div>Register page</div>;
}
