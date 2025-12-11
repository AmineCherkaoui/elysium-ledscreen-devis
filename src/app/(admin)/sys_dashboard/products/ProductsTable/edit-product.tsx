import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateProductWithImage } from "@/lib/actions/products";
import { formSchema } from "@/schemas/product";
import { ProductType } from "@/types";
import { toast } from "sonner";
import z from "zod";
import { ProductForm } from "./product-form";

type EditProductDialogType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductType;
};

export function EditProductDialog({
  product,
  onOpenChange,
  open,
}: EditProductDialogType) {
  const updatedProduct = {
    ...product,
    nom: product.nom ?? "",
    fabricant: product.fabricant ?? "",
    description: product.description ?? "",
    resolutionX: product.resolutionX?.toString() ?? "",
    resolutionY: product.resolutionY?.toString() ?? "",
    taillePouces: product.taillePouces?.toString() ?? "",
    luminositeNits: product.luminositeNits?.toString() ?? "",
    tauxRafraichissementHz: product.tauxRafraichissementHz?.toString() ?? "",
    puissanceWatts: product.puissanceWatts?.toString() ?? "",
  };

  async function handleEdit(values: z.infer<typeof formSchema>) {
    try {
      const { success, message } = await updateProductWithImage(
        product.slug,
        values
      );

      if (success) {
        toast.success(message);
        onOpenChange(false);
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="font-text max-w-full sm:max-w-[80%] lg:max-w-[900px]  h-full sm:max-h-[90vh]  sm:h-auto flex flex-col overflow-hidden border-gray-200 rounded-none sm:rounded-xl">
        <DialogHeader>
          <DialogTitle>Modifier le produit</DialogTitle>
          <DialogDescription>
            Modifiez les détails du produit ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-1 py-4 flex-1">
          <ProductForm
            submitLabel="Modifier le produit"
            onSubmit={handleEdit}
            initialValues={Object.fromEntries(
              Object.entries(updatedProduct).map(([key, value]) => [
                key,
                value ?? "",
              ])
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
