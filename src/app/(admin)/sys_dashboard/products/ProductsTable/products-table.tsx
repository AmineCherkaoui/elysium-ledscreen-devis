import { getProducts } from "@/lib/api/products";
import { columns } from "./product-columns";
import { ProductDataTable } from "./product-data-table";

type SearchParams = {
  page?: string;
  limit?: string;
  search?: string;
};

export default async function ProductsTable({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const search = params?.search || "";

  const { products, totalPages } = await getProducts({
    page,
    limit,
    search,
  });

  return (
    <ProductDataTable
      columns={columns}
      data={products}
      pageCount={totalPages}
    />
  );
}
