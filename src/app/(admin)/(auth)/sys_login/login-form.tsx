"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { login } from "@/lib/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.email("Email invalid"),
  password: z.string().min(8, "Mot de passe requis"),
});

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/sys_dashboard";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { success, message } = await login(values.email, values.password);
      if (success) {
        toast.success(message);
        router.push(redirect as any);
        router.refresh();
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  }
  const isLoading = form.formState.isSubmitting;



  return (
    <div
      className={cn(
        "flex justify-center  flex-col gap-6 relative",
        className
      )}
      {...props}
    >
      <Link href="/">
        <img
          src="/logo/logo.png"
          alt="Elysium Logo"
          className="invert-100 hover:invert-50 object-cover w-24 right-1/2 translate-x-1/2 absolute top-6  transition-all"
        />
      </Link>
      <h1 className="text-2xl font-bold">Connectez-vous</h1>
      <div>
        <Form {...form}>
          <form className="font-text" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse e-mail</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input {...field} type={"password"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin h-4 w-4" />
                      Chargement...
                    </span>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
