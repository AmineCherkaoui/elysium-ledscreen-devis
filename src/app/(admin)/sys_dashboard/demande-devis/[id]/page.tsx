import BackButton from "@/components/back-button";
import { SetHeaderTitle } from "@/components/dashboard/set-header-title";
import { getDemandeDevisById } from "@/lib/api/demande-devis";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DemandeDevisCard from "./demande-devis-card";
import DemandeDevisStatusSwitcher from "./demande-devis-status-switcher";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { demande } = await getDemandeDevisById(id);
  if (!demande) notFound();

  return {
    title: `Dashboard: Demande de devis : ${demande.nom} | Elysium`,
  };
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const { demande } = await getDemandeDevisById(id);

  if (!demande) notFound();

  return (
    <>
      <SetHeaderTitle title={`Demande de devis : ${demande.nom}`} />
      <div className="flex items-center justify-between">
        <BackButton />
        <DemandeDevisStatusSwitcher
          id={demande.id}
          currentStatus={demande.status}
        />
      </div>
      <DemandeDevisCard demande={demande} />
    </>
  );
}
