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
import { deleteDemandeDevis } from "@/lib/actions/demande-devis";
import { DemandeDevisType } from "@/types";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { IconDotsVertical, IconEye, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { DemandeDevisStatusBadge } from "./demande-devis-status-badge";

export const columns: ColumnDef<DemandeDevisType>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("fr-FR"),
  },

  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs">
        {row.original.type.toUpperCase()}
      </Badge>
    ),
  },

  {
    accessorKey: "nom",
    header: "Nom",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "telephone",
    header: "Telephone",
  },

  {
    accessorKey: "adresse",
    header: "Adresse",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DemandeDevisStatusBadge status={row.original.status} />,
  },

  {
    accessorKey: "message",
    header: "Message",
  },

  {
    id: "actions",
    enableHiding: false,

    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];

function Actions({ id }: { id: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
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
          <Link href={`/sys_dashboard/demande-devis/${id}`}>
            <DropdownMenuItem>
              <IconEye /> Détails
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              setDeleteDialogOpen(true);
            }}
          >
            <IconTrash className="h-4 w-4 text-destructive" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDemandeDevisDialog
        id={id}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}

function DeleteDemandeDevisDialog({
  id,
  open,
  onOpenChange,
}: {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const handleDelete = async () => {
    try {
      const { message, success } = await deleteDemandeDevis(id);
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
            Cette action est irréversible. Êtes-vous sûr de vouloir supprimer
            cette demande de devis ?
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
