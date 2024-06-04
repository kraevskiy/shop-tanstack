import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { useLoginMutation } from "@/lib/queries.ts";
import { LoginInputs, loginSchema } from "@/types/login.schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { ELocalStorage } from "@/types/local-storage-enum.ts";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { IUserLogin } from "@/types/user.interface.ts";

interface LoginFormProps {
  onSuccess?: (data: IUserLogin) => void;
  onError?: (error: { message: string }) => void;
  values?: LoginInputs;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError, values }) => {
  const { mutateAsync, isPending } = useLoginMutation();
  const form = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: values ?? {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInputs) => {
    const res = await mutateAsync(data);
    if ("token" in res) {
      localStorage.setItem(ELocalStorage.token, res.token);
      if (onSuccess) {
        onSuccess(res);
      }
    } else {
      if (onError) {
        onError(res);
      }
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
        <FormField
          control={form.control}
          name="username"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
