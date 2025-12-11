import { SetHeaderTitle } from "@/components/dashboard/set-header-title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDashboardSummary } from "@/lib/api/dashboard";
import { IconFileInvoice } from "@tabler/icons-react";
import { Clock, MessageCircleMore, Package } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { columns as messageColumns } from "./contact-messages/ContactTable/contact-columns";
import { DataTable as MessageDataTable } from "./contact-messages/ContactTable/contact-data-table";
import { columns as demandesDevisColumns } from "./demande-devis/DemandeTable/demande-column";
import { DataTable as DemandesDevisTable } from "./demande-devis/DemandeTable/demande-devis-data-table";

export const metadata: Metadata = {
  title: "Dashboard | Elysium",
};

export default async function Page() {
  const {
    demandes_devis_en_attente,
    messages_non_lu,
    total_demandes_devis,
    total_produits,
    total_demandes_devis_en_attente,
    total_messages_non_lu,
  } = await getDashboardSummary();

  return (
    <div className="space-y-8">
      <SetHeaderTitle title={"Dashboard"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/sys_dashboard/demande-devis">
          <Card className="border-0 hover:grayscale-25 hover:shadow-xl duration-500 transition-all overflow-hidden relative bg-gradient-to-br from-blue-500 to-blue-600">
            <div className="absolute right-0 bottom-0 opacity-20">
              <IconFileInvoice size={128} />
            </div>
            <CardHeader className="relative z-10 text-white">
              <CardTitle className="text-sm font-bold ">
                Total demandes devis
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 text-white">
              <p className="text-2xl font-bold ">
                {total_demandes_devis ?? "..."}
              </p>
              <p className="text-sm  mt-1">demandes</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/sys_dashboard/products">
          <Card className="border-0 hover:grayscale-25 hover:shadow-xl duration-500 transition-all overflow-hidden relative bg-gradient-to-br from-purple-500 to-indigo-600">
            <div className="absolute right-0 bottom-0 opacity-20">
              <Package size={128} />
            </div>
            <CardHeader className="relative z-10 text-white">
              <CardTitle className="text-sm font-bold ">
                Total des produits
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 text-white">
              <p className="text-2xl font-bold ">{total_produits ?? "..."}</p>
              <p className="text-sm  mt-1">produits</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/sys_dashboard/demande-devis?status=en_attente">
          <Card className="border-0 hover:grayscale-25 hover:shadow-xl duration-500 transition-all overflow-hidden relative bg-gradient-to-br from-yellow-500 to-orange-500">
            <div className="absolute right-0 bottom-0 opacity-20">
              <Clock size={128} />
            </div>
            <CardHeader className="relative z-10 text-white">
              <CardTitle className="text-sm font-bold ">
                Demande de devis en attente
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 text-white">
              <p className="text-2xl font-bold ">
                {total_demandes_devis_en_attente ?? "..."}
              </p>
              <p className="text-sm  mt-1">demandes</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/sys_dashboard/contact-messages?status=false">
          <Card className="border-0 hover:grayscale-25 hover:shadow-xl duration-500 l transition-all overflow-hidden relative bg-gradient-to-br from-red-500 to-pink-600">
            <div className="absolute right-0 bottom-0 opacity-20">
              <MessageCircleMore size={128} />
            </div>
            <CardHeader className="relative z-10 text-white">
              <CardTitle className="text-sm font-bold">
                Messages non lus
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 text-white ">
              <p className="text-2xl font-bold ">
                {total_messages_non_lu ?? "..."}
              </p>
              <p className="text-sm  mt-1">messages</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 ">
        <Card className="border-gray-300">
          <CardHeader>
            <CardTitle>Demandes de devis en attente</CardTitle>
            <CardDescription>
              Voici les 5 dernières demandes de devis en attente de votre
              validation.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <DemandesDevisTable
              pageCount={1}
              enableColumnVisibility={false}
              enableFiltering={false}
              enablePagination={false}
              columns={demandesDevisColumns}
              data={demandes_devis_en_attente}
            />
          </CardContent>
        </Card>

        <Card className="border-gray-300">
          <CardHeader>
            <CardTitle>Message non lus</CardTitle>
            <CardDescription>
              Voici les 5 dernières messages non lus en attente de votre
              validation.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <MessageDataTable
              pageCount={1}
              enableColumnVisibility={false}
              enableFiltering={false}
              enablePagination={false}
              columns={messageColumns}
              data={messages_non_lu}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
