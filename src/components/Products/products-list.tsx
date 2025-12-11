import type { ProductType } from "@/types";
import { Box } from "lucide-react";
import ProductCard from "./product-card";

type Props = {
  products?: ProductType[];
};

const ProductsList = ({ products }: Props) => {
  return (
    <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
      {products?.length ? (
        products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })
      ) : (
        <div className="col-span-full h-full flex flex-col gap-6 justify-center items-center p-12">
          <Box size={92} className="text-primary-500" />
          <h2 className="text-4xl font-oswald text-center font-bold text-primary-500">
            Produits indisponibles pour le moment
          </h2>
          <p className="text-center">
            Nous sommes en train de mettre à jour notre catalogue pour mieux
            répondre à vos besoins.
            <br />
            Revenez bientôt pour découvrir nos dernières offres en écrans LED
            professionnels.
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductsList;
