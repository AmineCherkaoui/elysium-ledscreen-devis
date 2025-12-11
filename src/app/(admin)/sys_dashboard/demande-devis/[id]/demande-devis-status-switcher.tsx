"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateDemandeDevisStatus } from "@/lib/actions/demande-devis";
import { DemandeDevisStatusType } from "@/types";
import { IconMenuDeep } from "@tabler/icons-react";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DemandeDevisStatusSwitcherProps {
  id: string;
  currentStatus: DemandeDevisStatusType;
}

const statusOptions = [
  {
    value: "en_attente" as DemandeDevisStatusType,
    label: "En attente",
  },
  {
    value: "confirme" as DemandeDevisStatusType,
    label: "Confirmée",
  },
  {
    value: "traite" as DemandeDevisStatusType,
    label: "Traitée",
  },
  {
    value: "annule" as DemandeDevisStatusType,
    label: "Annulée",
  },
];

export default function DemandeDevisStatusSwitcher({
  id,
  currentStatus,
}: DemandeDevisStatusSwitcherProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusSelect = async (newStatus: DemandeDevisStatusType) => {
    if (newStatus === currentStatus) return;

    setIsLoading(true);
    try {
      const { message, success } = await updateDemandeDevisStatus(
        id,
        newStatus
      );

      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(`Error updating status`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="border-gray-300"
          variant="outline"
          size={"icon"}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {!isLoading && <IconMenuDeep />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="font-text border-gray-300 bg-white w-48"
      >
        <DropdownMenuLabel className="text-xs font-bold">
          Changer le statut
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusSelect(option.value)}
            disabled={isLoading || currentStatus === option.value}
            className="text-sm"
          >
            <span>{option.label}</span>
            {currentStatus === option.value && <Check />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
