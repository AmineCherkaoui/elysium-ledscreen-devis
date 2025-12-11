"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categoryLabels } from "@/constants";
import { deleteProduct } from "@/lib/actions/products";
import { ProductType } from "@/types";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { EditProductDialog } from "./edit-product";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
  },
  {
    accessorKey: "nom",
    header: "Nom",
  },

  {
    accessorKey: "fabricant",
    header: "Fabricant",
  },

  {
    accessorKey: "category",
    header: "Catégorie",
    cell: ({ row }) =>
      categoryLabels[row.getValue("category") as keyof typeof categoryLabels],
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) =>
      row.original.description ? row.original.description : <EmptyField />,
  },
  {
    id: "resolution",
    header: "Résolution",
    cell: ({ row }) => {
      const { resolutionX, resolutionY } = row.original;
      return resolutionX && resolutionY ? (
        `${resolutionX}×${resolutionY}`
      ) : (
        <EmptyField />
      );
    },
  },
  {
    accessorKey: "taillePouces",
    header: "Taille (Pouces)",
    cell: ({ row }) =>
      row.original.taillePouces ? row.original.taillePouces : <EmptyField />,
  },
  {
    accessorKey: "luminositeNits",
    header: "Luminosité (nits)",
    cell: ({ row }) =>
      row.original.luminositeNits ? (
        row.original.luminositeNits
      ) : (
        <EmptyField />
      ),
  },
  {
    accessorKey: "tauxRafraichissementHz",
    header: "Refresh rate (Hz)",
    cell: ({ row }) =>
      row.original.tauxRafraichissementHz ? (
        row.original.tauxRafraichissementHz
      ) : (
        <EmptyField />
      ),
  },
  {
    accessorKey: "puissanceWatts",
    header: "Puissance (Watts)",
    cell: ({ row }) =>
      row.original.puissanceWatts ? (
        row.original.puissanceWatts
      ) : (
        <EmptyField />
      ),
  },

  {
    id: "actions",
    enableHiding: false,

    cell: ({ row }) => (
      <Actions product={row.original} slug={row.original.slug} />
    ),
  },
];

function Actions({ slug, product }: { slug: string; product: ProductType }) {
  const [open, setOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Ouvrir</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-32 border-gray-200 font-text"
        >
          <Link href={`/produits/${slug}`}>
            <DropdownMenuItem>
              <IconEye /> Voir
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setOpen(false);
              setShowEditDialog(true);
            }}
          >
            <IconEdit />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              setOpen(false);
              setShowDeleteDialog(true);
            }}
          >
            <IconTrash className="h-4 w-4 text-destructive" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProductDialog
        product={product}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />

      <DeleteProductDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        slug={slug}
      />
    </>
  );
}

function DeleteProductDialog({
  open,
  onOpenChange,
  slug,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slug: string;
}) {
  const handleDelete = async () => {
    try {
      const { message, success } = await deleteProduct(slug);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      onOpenChange(false);
    } catch {
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-text border-gray-200">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce
            produit ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EmptyField() {
  return <Badge variant="secondary">Non défini</Badge>;
}
