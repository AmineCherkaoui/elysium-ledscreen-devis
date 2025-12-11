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
import { DemandeDevisStatusType } from "@/types";
import { IconMenuDeep } from "@tabler/icons-react";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Status = DemandeDevisStatusType | "tous";

const statusOptions: { value: Status; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "en_attente" as DemandeDevisStatusType, label: "En attente" },
  { value: "confirme" as DemandeDevisStatusType, label: "Confirmée" },
  { value: "traite" as DemandeDevisStatusType, label: "Traitée" },
  { value: "annule" as DemandeDevisStatusType, label: "Annulée" },
];

export default function DemandeDevisStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = (searchParams.get("status") as Status) || "tous";

  const handleStatusSelect = (newStatus: Status) => {
    if (newStatus === currentStatus) return;
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus === "tous") {
      params.delete("status");
      params.delete("page");
    } else {
      params.set("status", newStatus);
       params.delete("page");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border-gray-300" variant="outline" size="icon">
          <IconMenuDeep />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="font-text border-gray-300 bg-white w-48"
      >
        <DropdownMenuLabel className="text-xs font-bold">
          Filtrer par status
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusSelect(option.value)}
            disabled={currentStatus === option.value}
            className="text-sm flex justify-between"
          >
            <span>{option.label}</span>
            {currentStatus === option.value && <Check className="ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
