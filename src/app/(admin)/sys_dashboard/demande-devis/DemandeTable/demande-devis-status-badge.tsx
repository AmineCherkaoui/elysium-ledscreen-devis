import { cn } from "@/lib/utils";
import { DemandeDevisStatusType } from "@/types";

const statusMap: Record<
  DemandeDevisStatusType,
  { label: string; className: string; pulseColor: string }
> = {
  en_attente: {
    label: "En attente",
    className:
      "text-sm text-yellow-600 bg-yellow-100 border border-yellow-600 px-2 py-1 rounded-full",
    pulseColor: "bg-yellow-600",
  },
  confirme: {
    label: "Confirmée",
    className:
      "text-sm text-green-700 bg-green-100 border border-green-700 px-2 py-1 rounded-full",
    pulseColor: "bg-green-700",
  },
  traite: {
    label: "Traitée",
    className:
      "text-sm text-blue-700 bg-blue-100 border border-blue-700 px-2 py-1 rounded-full",
    pulseColor: "bg-blue-700",
  },
  annule: {
    label: "Annulée",
    className:
      "text-sm text-red-700 bg-red-100 border border-red-700 px-2 py-1 rounded-full",
    pulseColor: "bg-red-700",
  },
};

export const DemandeDevisStatusBadge = ({
  status,
  className,
}: {
  status: DemandeDevisStatusType;
  className?: string;
}) => {
  const statusInfo = statusMap[status];
  return (
    <span
      className={cn("flex items-center gap-2", statusInfo.className, className)}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            statusInfo.pulseColor
          )}
        ></span>
        <span
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            statusInfo.pulseColor
          )}
        ></span>
      </span>
      {statusInfo.label}
    </span>
  );
};
