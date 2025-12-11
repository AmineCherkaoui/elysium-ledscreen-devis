import { getProducts } from "@/lib/api/products";
import ProductsList from "./products-list";
import Paginations from "./products-pagination";

type Props = {
  category?: string;
  currentPage?: number;
  onChangePage?: (page: number) => string;
};

export default async function ProductsListWithPagination({
  category = "",
  currentPage = 1,
  onChangePage = () => "",
}: Props) {
  const { products, totalPages } = await getProducts({
    category,
    page: currentPage,
  });
  return (
    <section className="flex flex-col  gap-6 min-h-[70svh]">
      <ProductsList products={products} />
        <Paginations
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={onChangePage}
        />

    </section>
  );
}
