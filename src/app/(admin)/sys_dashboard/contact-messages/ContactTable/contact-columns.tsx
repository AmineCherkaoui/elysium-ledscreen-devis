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
import { deleteContact } from "@/lib/actions/contacts";
import { MessageType } from "@/types";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { IconDotsVertical, IconEye, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export const columns: ColumnDef<MessageType>[] = [
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
    accessorKey: "message",
    header: "Message",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.status ? (
        <Badge variant="default">Lu</Badge>
      ) : (
        <Badge variant="secondary">Non lu</Badge>
      ),
  },

  {
    id: "actions",
    enableHiding: false,

    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
function Actions({ id }: { id: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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
          <Link href={`/sys_dashboard/contact-messages/${id}`}>
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
              setDialogOpen(true);
            }}
          >
            <IconTrash className="h-4 w-4 text-destructive" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteContactDialog
        id={id}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}

function DeleteContactDialog({
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
      const { message, success } = await deleteContact(id);

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
            message ?
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
