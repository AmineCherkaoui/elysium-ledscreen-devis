import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createProductWithImage } from "@/lib/actions/products";
import { formSchema } from "@/schemas/product";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { ProductForm } from "./product-form";

export function AddProductButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleCreate(values: z.infer<typeof formSchema>) {
    try {
      console.log("Creating product with values:", values);
      const { success, message } = await createProductWithImage(values);
      if (success) {
        toast.success(message);
        setOpen(false);
        router.refresh();
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus />
          Ajouter
        </Button>
      </DialogTrigger>
      <DialogContent className="font-text max-w-full sm:max-w-[80%] lg:max-w-[900px]  h-full sm:max-h-[90vh]  sm:h-auto flex flex-col overflow-hidden border-gray-200 rounded-none sm:rounded-xl">
        <DialogHeader>
          <DialogTitle>Ajouter un produit</DialogTitle>
          <DialogDescription>
            Remplissez les détails du produit ci-dessous. L’image est
            optionnelle.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-1 py-4 flex-1">
          <ProductForm
            submitLabel="Ajouter le produit"
            onSubmit={handleCreate}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
