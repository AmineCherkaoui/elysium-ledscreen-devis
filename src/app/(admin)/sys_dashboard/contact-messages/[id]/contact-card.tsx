import { cn } from "@/lib/utils";
import { MessageType } from "@/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ContactCard({ contact }: { contact: MessageType }) {
  return (
    <div className=" rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 p-6 border-b border-gray-200">
        <h1 className="text-base md:text-2xl font-bold text-primary ">
          Détails du message de contact
        </h1>
        <span className="text-xs md:text-sm text-gray-500">
          Envoyé le{" "}
          <strong>
            {format(contact.created_at, "d MMMM yyyy à HH:mm", { locale: fr })}
          </strong>
        </span>
      </div>
      <div className="flex flex-col gap-4 p-6 relative">
        <ContactStatus
          status={contact.status}
          className="absolute top-5 right-5"
        />
        <p className="text-xs md:text-sm">
          <strong>Nom :</strong> {contact.nom}
        </p>
        <p className="text-xs md:text-sm">
          <strong>Email :</strong> {contact.email}
        </p>
        <p className="text-xs md:text-sm">
          <strong>Téléphone :</strong> {contact.telephone}
        </p>
        <div className="flex flex-col gap-2 text-xs md:text-sm">
          <p>
            <strong>Message :</strong>
          </p>
          <p className="whitespace-pre-wrap border border-gray-200 p-4 rounded-lg min-h-32">
            {contact.message}
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactStatus({
  status,
  className,
}: {
  status: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        `px-4 py-1 rounded-full max-w-fit text-xs md:text-sm ${className}`,
        {
          "bg-primary text-white ": status,
        },
        {
          "bg-gray-200 text-gray-600": !status,
        }
      )}
    >
      {status ? "Lu" : "Non lu"}
    </p>
  );
}
