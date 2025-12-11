"use client";

import { deleteContact, markAsRead } from "@/lib/actions/contacts";
import { cn } from "@/lib/utils";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ContactActionsProps = {
  contactId: string;
  status: boolean;
};

export function ContactActions({ contactId, status }: ContactActionsProps) {
  const [isSetting, setIsSetting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleMarkAsRead = async () => {
    try {
      setIsSetting(true);
      const { success, message } = await markAsRead(contactId);
      if (success) {
        toast.success(message);
        // router.refresh();
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    } finally {
      setIsSetting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const { success, message } = await deleteContact(contactId);
      if (success) {
        toast.success(message);
        router.replace("/sys_dashboard/contact-messages");
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-between w-full sm:w-auto">
      {!status && (
        <button
          disabled={isSetting}
          className={cn(
            "flex items-center gap-2 py-1 bg-primary-500 text-white px-4 rounded-full text-sm hover:bg-primary-600 transition cursor-pointer",
            {
              "opacity-70 cursor-not-allowed": isSetting,
            }
          )}
          onClick={handleMarkAsRead}
        >
          <IconEye />
          {isSetting ? "En cours..." : "Marquer comme lu"}
        </button>
      )}

      <button
        disabled={isDeleting}
        className={cn(
          "flex items-center gap-2 py-1 bg-destructive text-white px-4 rounded-full text-sm hover:bg-destructive/80 transition cursor-pointer",
          {
            "opacity-70 cursor-not-allowed": isDeleting,
          }
        )}
        onClick={handleDelete}
      >
        <IconTrash />
        {isDeleting ? "En cours..." : "Supprimer"}
      </button>
    </div>
  );
}
