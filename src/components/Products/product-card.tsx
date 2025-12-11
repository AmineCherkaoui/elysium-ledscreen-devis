import { ProductType } from "@/types";
import Link from "next/link";
import ProductImage from "./product-image";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-black/10 transition-all group">
      <Link href={`/produits/${product.slug}`} key={product.id}>
        <div className="relative h-48 overflow-hidden">
          <ProductImage
            productImage={product.imageUrl}
            productNom={product.nom}
          />
        </div>
        <div className="px-4 pt-6 pb-8 flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-semibold">{product.nom}</h3>
            <p className="text-sm text-neutral-500 font-semibold uppercase">
              {product.fabricant}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
