"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { DatePickerWithRange } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { addDemandeDevis } from "@/lib/actions/demande-devis";
import { ProductType } from "@/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { format } from "date-fns";

interface ProductActionsProps {
  product: ProductType;
}

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
  adresse: z.string(),
  quantite: z.string().min(1, "La quantité est requise"),
  message: z.string().min(5, "Message trop court"),
  type: z.enum(["achat", "location"], {
    error: "Veuillez sélectionner un type",
  }),
});

type DevisFormData = z.infer<typeof devisSchema>;

export default function ProductActions({ product }: ProductActionsProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const form = useForm<DevisFormData>({
    resolver: zodResolver(devisSchema),
    defaultValues: {
      nom: "",
      email: "",
      adresse: "",
      telephone: "",
      message: "",
      quantite: "1",
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
      produit_id: product.id,
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
        setTimeout(() => setShowModal(false), 500);
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="font-text">
      <Button onClick={() => setShowModal(true)} className="w-full" size="lg">
        Demande de devis
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-white border-gray-300 font-text max-h-[90svh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Demande de devis</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Remplissez le formulaire ci-dessous pour recevoir un devis
              personnalisé.
            </DialogDescription>
          </DialogHeader>

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
                          <span className="text-center font-medium">
                            Location
                          </span>
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
                name="quantite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quantité <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="1"
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

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  className="border-gray-300"
                  variant="outline"
                  onClick={() => {
                    setShowModal(false);
                    form.reset();
                    setDateRange(undefined);
                  }}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin h-4 w-4" />
                      Envoi...
                    </span>
                  ) : (
                    "Envoyer la demande"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
