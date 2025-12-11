"use client";
import { DatePickerWithRange } from "@/components/date-picker";
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
import { addDemandeDevis } from "@/lib/actions/demande-devis";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { ComponentProps, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const devisSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  email: z.email("Email invalide"),
  telephone: z
    .string()
    .regex(/^\+?[0-9\s\-().]{10,20}$/, "Le numéro de téléphone est invalide")
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Le numéro de téléphone doit contenir au moins 10 chiffres"
    ),
  adresse: z.string().min(1, "L'adresse est requis"),
  message: z.string().min(5, "Message trop court"),
  type: z.enum(["achat", "location"], {
    error: "Veuillez sélectionner un type",
  }),
});
type DevisFormData = z.infer<typeof devisSchema>;

export function DevisForm({ className, ...props }: ComponentProps<"div">) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const form = useForm<DevisFormData>({
    resolver: zodResolver(devisSchema),
    defaultValues: {
      nom: "",
      email: "",
      adresse: "",
      telephone: "",
      message: "",
      type: "" as "achat" | "location",
    },
  });
  const watchType = form.watch("type");

  const handleSubmit = async (values: DevisFormData) => {
    if (values.type === "location" && (!dateRange?.from || !dateRange?.to)) {
      toast.error("Veuillez sélectionner une plage de dates pour la location.");
      return;
    }

    const data = {
      ...values,
      ...(values.type === "location" && {
        date_debut: dateRange?.from
          ? format(dateRange.from, "yyyy-MM-dd")
          : undefined,
        date_fin: dateRange?.to
          ? format(dateRange.to, "yyyy-MM-dd")
          : undefined,
      }),
    };

    try {
      const { success, message } = await addDemandeDevis(data);

      if (success) {
        toast.success("Votre demande de devis a été envoyée avec succès!");
        form.reset();
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 py-4"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Type <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`relative flex items-center justify-center cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        field.value === "achat"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-300 hover:bg-gray-100 hover:border-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        value="achat"
                        checked={field.value === "achat"}
                        onChange={() => field.onChange("achat")}
                      />
                      <span className="text-center font-medium">Achat</span>
                    </label>
                    <label
                      className={`relative flex items-center justify-center cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        field.value === "location"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-300 hover:bg-gray-100 hover:border-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        value="location"
                        checked={field.value === "location"}
                        onChange={() => field.onChange("location")}
                      />
                      <span className="text-center font-medium">Location</span>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchType === "location" && (
            <div className="space-y-2">
              <FormLabel>
                Période de location <span className="text-red-500">*</span>
              </FormLabel>
              <DatePickerWithRange
                className="w-full"
                date={dateRange}
                setDate={setDateRange}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nom complet <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Votre nom"
                    onKeyDown={(e) => e.stopPropagation()}
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
                <FormLabel>
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="votre@email.com"
                    onKeyDown={(e) => e.stopPropagation()}
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
                <FormLabel>
                  Téléphone <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="0612345678"
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="adresse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Adresse <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Votre adresse"
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className={"md:col-span-2"}>
                <FormLabel>
                  Message <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="border-gray-300 bg-white h-32"
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
                  Envoi en cours...
                </span>
              ) : (
                "Envoyer la demande"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
