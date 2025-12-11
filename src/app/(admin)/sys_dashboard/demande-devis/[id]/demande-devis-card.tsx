import { cn, truncateText } from "@/lib/utils";
import { DemandeDevisType } from "@/types";
import { differenceInDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { DemandeDevisStatusBadge } from "../DemandeTable/demande-devis-status-badge";

export default function DemandeDevisCard({
  demande,
}: {
  demande: DemandeDevisType;
}) {
  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 p-6 border-b border-gray-200">
        <h1 className="text-base md:text-2xl font-bold text-primary">
          Détails de la demande de devis :
        </h1>
        <span className="text-xs md:text-sm text-gray-500">
          Commandé le{" "}
          <strong>
            {format(demande.created_at, "d MMMM yyyy ", { locale: fr })}
          </strong>{" "}
          à <strong>{format(demande.created_at, "HH:mm")}</strong>
        </span>
      </div>

      <div className="flex flex-col gap-6 p-6 relative">
        <DemandeDevisStatusBadge
          className="absolute top-5 right-5"
          status={demande.status}
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Informations client
          </h2>
          <p className="text-xs md:text-sm">
            <strong>Nom :</strong> {demande.nom}
          </p>
          <p className="text-xs md:text-sm">
            <strong>Email :</strong> {demande.email}
          </p>
          <p className="text-xs md:text-sm">
            <strong>Téléphone :</strong> {demande.telephone}
          </p>
          <p className="text-xs md:text-sm">
            <strong>Adresse :</strong> {demande.adresse}
          </p>

          <p className="text-xs md:text-sm">
            <strong>Type :</strong>{" "}
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs",
                demande.type === "achat"
                  ? "bg-primary-100 text-primary-700"
                  : "bg-blue-100 text-blue-700",
              )}
            >
              {demande.type === "achat" ? "Achat" : "Location"}
            </span>
            {demande.type === "location" &&
              demande.date_debut &&
              demande.date_fin && (
                <span className="text-sm text-muted-foreground ml-4">
                  {`Du ${format(demande.date_debut, "dd LLLL yyyy", {
                    locale: fr,
                  })} au ${format(demande.date_fin, "dd LLLL yyyy", {
                    locale: fr,
                  })} `}
                  ({differenceInDays(demande.date_fin, demande.date_debut) + 1}{" "}
                  jours)
                </span>
              )}
          </p>

          <div className="flex flex-col gap-2 text-xs md:text-sm">
            <p>
              <strong>message :</strong>
            </p>
            <p className="whitespace-pre-wrap border border-gray-200 p-4 rounded-lg min-h-20">
              {demande.message}
            </p>
          </div>
        </div>

        {Boolean(demande.produit_id) && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-800">Article</h2>
            <Link
              href={`/produits/${demande.produit.slug}`}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col md:flex-row gap-4 border-b last:border-none border-gray-200 p-4">
                {demande.produit.imageUrl && (
                  <Image
                    src={demande.produit.imageUrl}
                    alt={demande.produit.nom}
                    width={128}
                    height={128}
                    className="object-cover rounded-lg"
                  />
                )}
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="font-semibold text-sm md:text-base">
                    {demande.produit.nom}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium uppercase">
                    {demande.produit.fabricant}
                  </p>
                  <p className="text-xs text-gray-500">
                    {truncateText(demande.produit.description, 200)}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center text-xs md:text-sm">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        demande.type === "achat"
                          ? "bg-primary-100 text-primary-700"
                          : "bg-blue-100 text-blue-700",
                      )}
                    >
                      {demande.type === "achat" ? "Achat" : "Location"}
                    </span>
                    {demande.type === "location" &&
                      demande.date_debut &&
                      demande.date_fin && (
                        <span className="text-sm text-muted-foreground">
                          {`Du ${format(demande.date_debut, "dd LLLL yyyy", {
                            locale: fr,
                          })} au ${format(demande.date_fin, "dd LLLL yyyy", {
                            locale: fr,
                          })} `}
                          (
                          {differenceInDays(
                            demande.date_fin,
                            demande.date_debut,
                          ) + 1}{" "}
                          jours)
                        </span>
                      )}
                    <span>
                      Quantité : <strong>{demande.quantite}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
