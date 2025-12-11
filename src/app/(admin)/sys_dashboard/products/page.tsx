import { SetHeaderTitle } from "@/components/dashboard/set-header-title";
import { Metadata } from "next";
import ProductsTable from "./ProductsTable/products-table";

export const metadata: Metadata = {
  title: "Dashboard: Produits | Elysium",
};

type PageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  return (
    <>
      <SetHeaderTitle title="Produits" />
      <ProductsTable searchParams={searchParams} />
    </>
  );
};

export default Page;
