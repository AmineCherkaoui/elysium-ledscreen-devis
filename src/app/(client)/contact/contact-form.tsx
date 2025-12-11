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
import { Textarea } from "@/components/ui/textarea";
import { addContactMessage } from "@/lib/actions/contacts";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  email: z.email("Email invalid"),
  telephone: z
    .string()
    .regex(/^\+?[0-9\s\-().]{10,20}$/, "Le numéro de téléphone est invalide")
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Le numéro de téléphone doit contenir au moins 10 chiffres"
    ),
  message: z.string().min(10, "Message trop court"),
});

export function ContactForm({ className, ...props }: ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      email: "",
      telephone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { success, message } = await addContactMessage(values);
      if (success) {
        toast.success(message);
        form.reset();
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form className="font-text" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 bg-white placeholder:text-gray-500"
                      {...field}
                      placeholder="Votre nom complet"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse e-mail</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 bg-white placeholder:text-gray-500"
                      {...field}
                      placeholder="votre@email.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 bg-white placeholder:text-gray-500"
                      {...field}
                      placeholder="0612345678"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              key="description"
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className={"md:col-span-2"}>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-gray-300 bg-white placeholder:text-gray-500 h-32"
                      placeholder="Écrivez votre message ici..."
                      {...field}
                      value={field.value || ""}
                      onKeyDown={(e) => e.stopPropagation()}
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
                  "Envoyer le message"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
