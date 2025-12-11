import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

import ProductListSkeleton from "@/components/Products/product-list-skeleton";
import ProductsListWithPagination from "@/components/Products/products-list-with-pagination";
import { categoryLabels } from "@/constants";
import { notFound } from "next/navigation";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category: string; page: string }>;
}) {
  const params = await searchParams;
  let category = params?.category;

  if (category && !Object.keys(categoryLabels).includes(category)) {
    return notFound();
  }

  category = category
    ? categoryLabels[category as keyof typeof categoryLabels]
    : "";

  return {
    title: `Nos Écrans LED ${category} | Elysium`,
    description: `Découvrez notre sélection des écrans LED ${category} chez Elysium.`,
  };
}

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string; page: string }>;
}) => {
  const search = await searchParams;
  const category = search.category;

  if (category && !Object.keys(categoryLabels).includes(category)) {
    return notFound();
  }

  const currentPage = Number(search.page) || 1;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (category) {
      params.set("category", category);
    }
    return `?${params.toString()}`;
  };

  return (
    <section className="container mx-auto px-2">
      <ul className="flex flex-wrap gap-6 justify-center sm:justify-start items-center py-6 mt-2 text-xl font-medium font-oswald">
        <li>
          <Link
            href={`/produits`}
            className={cn(
              "uppercase px-4 py-1 rounded-full transition-all duration-200",
              {
                "text-white bg-primary-500 ": !category,
              },
              { "hover:bg-primary-50 hover:text-primary-500": category }
            )}
          >
            Tous
          </Link>
        </li>
        {Object.entries(categoryLabels).map(([value, label]) => (
          <li key={value}>
            <Link
              href={`/produits?category=${value}`}
              className={cn(
                "uppercase px-4 py-1  rounded-full transition-all duration-200",
                {
                  "text-white bg-primary-500": category === value,
                },
                { "hover:bg-primary-50 hover:text-primary-500": category !== value }
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Suspense fallback={<ProductListSkeleton cardLength={8} />}>
        <ProductsListWithPagination
          category={category}
          currentPage={currentPage}
          onChangePage={createPageURL}
        />
      </Suspense>
    </section>
  );
};

export default Page;
