import { ProductType } from "@/types";

export async function getProducts({
  category,
  page,
  limit,
  search,
}: {
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
} = {}): Promise<{
  products: ProductType[];
  totalPages: number;
  totalItems: number;
}> {
  try {
    const queryParams = new URLSearchParams();
    if (category) queryParams.append("category", category);
    if (page) queryParams.append("page", page.toString());
    if (limit) queryParams.append("limit", limit.toString());
    if (search) queryParams.append("search", search);

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/products?${queryParams.toString()}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 86400, tags: ["products"] },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Erreur lors de la récupération des produits."
      );
    }

    const { totalPages, products, totalItems } = data.data;

    return {
      products,
      totalPages,
      totalItems,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
}

export async function getProductBySlug(
  slug: string
): Promise<{ product: ProductType | null }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${slug}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 86400, tags: ["products"] },
      }
    );

    if (res.status === 404) {
      return { product: null };
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Erreur lors de la récupération du produit."
      );
    }

    return { product: data.data };
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du produit avec le slug "${slug}":`,
      error
    );
    throw error;
  }
}

export async function getProductsByIds(
  ids: string[]
): Promise<{ products: ProductType[] | null }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${ids.join(",")}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 86400, tags: ["products"] },
      }
    );

    if (res.status === 404) {
      return { products: null };
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Erreur lors de la récupération des produits."
      );
    }

    return { products: data.data };
  } catch (error) {
    console.error(`Erreur lors de la récupération des produits":`, error);
    throw error;
  }
}
