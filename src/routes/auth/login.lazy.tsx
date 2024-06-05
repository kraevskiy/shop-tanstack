import { createFileRoute, redirect, useNavigate, useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import Page from "@/components/page.tsx";
import LoginForm from "@/components/forms/login.form.tsx";
import { useToast } from "@/components/ui/use-toast.ts";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } | void => {
    if ("redirect" in search && typeof search.redirect === "string") {
      return {
        redirect: search.redirect,
      };
    }
  },
  beforeLoad: ({ context, search }) => {
    if (context.user !== null) {
      throw redirect({ to: search?.redirect ?? "/profile" });
    }
  },
});

export function LoginPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const { toast } = useToast();

  const onSuccess = () => {
    router.invalidate().then(() => {
      navigate({
        to: "/",
      });
    });
  };

  const onError = (res: { message: string }) => {
    toast({
      title: res.message,
      variant: "destructive",
    });
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-md border p-5 lg:p-8">
        <div className="flex flex-col text-center">
          <Page.H1>Log In</Page.H1>
          <Page.P className="mb-4 text-muted-foreground">Enter your email and password to log in</Page.P>
          <LoginForm onSuccess={onSuccess} onError={onError} />
          <Separator className="my-4" />
          <p className="mb-2 mt-0 text-sm text-muted-foreground">Don't have un account</p>
          <Button
            className="w-full"
            onClick={() => {
              navigate({
                to: "/auth/register",
              });
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
