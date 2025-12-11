import { DemandeDevisType } from "@/types";
import { columns } from "./demande-column";
import { DataTable } from "./demande-devis-data-table";

export default function DemandeDevisTable({
  demandes,
  pageCount,
}: {
  demandes: DemandeDevisType[];
  pageCount: number;
}) {
  return <DataTable columns={columns} data={demandes} pageCount={pageCount} />;
}
