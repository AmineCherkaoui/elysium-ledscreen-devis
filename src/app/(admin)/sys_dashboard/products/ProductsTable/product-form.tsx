/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categoryLabels } from "@/constants";
import { cn } from "@/lib/utils";
import { formSchema } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconArticle,
  IconBadgeTm,
  IconCategory,
  IconPackage,
  IconPhotoScan,
  IconRefresh,
  IconRulerMeasure2,
  IconSun,
} from "@tabler/icons-react";
import { Loader2, PlugZap, Proportions } from "lucide-react";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AddProductFormProps = {
  initialValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  submitLabel: string;
  className?: string;
} & Omit<ComponentProps<"form">, "onSubmit">;

export function ProductForm({
  className,
  initialValues,
  submitLabel,
  onSubmit,
  ...props
}: AddProductFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      nom: "",
      fabricant: "",
      description: "",
      category: "INTERIEUR",
      resolutionX: "",
      resolutionY: "",
      taillePouces: "",
      luminositeNits: "",
      tauxRafraichissementHz: "",
      puissanceWatts: "",
      prixLocation: "",
      prixVente: "",
      ...initialValues,
    } as any,
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-5 font-text", className)}
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            key="nom"
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <IconPackage size={18} />
                  Nom
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key="fabricant"
            control={form.control}
            name="fabricant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <IconBadgeTm size={18} />
                  Fabricant
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            key="description"
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className={"md:col-span-2"}>
                <FormLabel>
                  <IconArticle size={18} />
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="border-gray-300 bg-white h-32"
                    {...field}
                    value={field.value || ""}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <IconPhotoScan size={18} />
                  Image du produit (optionnelle)
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2">
            <FormLabel>
              <Proportions size={18} /> Resolution
            </FormLabel>
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="resolutionX"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span>x</span>
              <FormField
                control={form.control}
                name="resolutionY"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            key="taillePouces"
            control={form.control}
            name="taillePouces"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <IconRulerMeasure2 size={18} />
                  Taille (pouces)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            key="luminositeNits"
            control={form.control}
            name="luminositeNits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <IconSun size={18} />
                  Luminosité (nits)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            key="tauxRafraichissementHz"
            control={form.control}
            name="tauxRafraichissementHz"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <IconRefresh size={18} />
                  Refresh Rate (Hz)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            key="puissanceWatts"
            control={form.control}
            name="puissanceWatts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <PlugZap size={18} />
                  Puissance (W)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <IconCategory size={18} /> Catégorie
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger onKeyDown={(e) => e.stopPropagation()}>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-gray-200 font-text">
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                Enregistrement...
              </span>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
