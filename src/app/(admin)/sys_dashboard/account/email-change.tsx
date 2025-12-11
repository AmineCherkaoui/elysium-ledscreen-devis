"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { useUser } from "@/context/userContext";
import { updateUser } from "@/lib/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.email("Email invalid"),
});

export function EmailForm({ className, ...props }: ComponentProps<"div">) {
  const router = useRouter();
  const user = useUser()!;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit({ email }: z.infer<typeof formSchema>) {
    try {
      const { success, message } = await updateUser({ email });
      if (success) {
        toast.success(message);
        router.refresh();
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow border border-gray-200">
        <CardHeader>
          <CardTitle>Changer votre email</CardTitle>
          <CardDescription className="text-black/50">
            Ce champ vous permet de personnaliser ou mettre à jour votre email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="font-text" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Change Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="test@email.com"
                          {...field}
                          type={"email"}
                        />
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
                      "Changer"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
