import { SetHeaderTitle } from "@/components/dashboard/set-header-title";
import { getDemandesDevis } from "@/lib/api/demande-devis";
import { DemandeDevisStatusType } from "@/types";
import { Metadata } from "next";
import DemandeDevisTable from "./DemandeTable/demande-devis-table";

export const metadata: Metadata = {
  title: "Dashboard: Demandes de devis | Elysium",
};

type PageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: DemandeDevisStatusType;
  }>;
};

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const search = params?.search || "";
  const status = params?.status;

  const { demandes, totalPages } = await getDemandesDevis({
    page,
    limit,
    search,
    status,
  });

  return (
    <>
      <SetHeaderTitle title="Demandes de devis" />
      <DemandeDevisTable demandes={demandes} pageCount={totalPages} />
    </>
  );
}
