import BackButton from "@/components/back-button";
import ProductImage from "@/components/Products/product-image";
import { categoryLabels } from "@/constants";
import { getProductBySlug, getProducts } from "@/lib/api/products";
import { PlugZap, Proportions, RefreshCcw, Ruler, Sun } from "lucide-react";
import * as motion from "motion/react-client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { type ElementType, type ReactNode } from "react";
import ProductActions from "./product-actions";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await getProductBySlug(slug);
  if (!product) notFound();

  return {
    title: `${product.nom} | Elysium`,
    description: product.description || `${product.nom} - Découvrez ce produit`,
  };
}

export async function generateStaticParams() {
  const { products } = await getProducts({ limit: 50 });
  return products.map((product) => ({ slug: product.slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { product } = await getProductBySlug(slug);
  if (!product) notFound();

  const productDetails = [
    {
      label: "Résolution",
      value:
        product.resolutionX && product.resolutionY
          ? `${product.resolutionX}x${product.resolutionY}`
          : null,
      icon: Proportions,
    },
    {
      label: "Taille",
      value: product.taillePouces
        ? `${Math.floor(product.taillePouces)} pouces`
        : null,
      icon: Ruler,
    },
    {
      label: "Luminosité",
      value: product.luminositeNits
        ? `${Math.floor(product.luminositeNits)} nits`
        : null,
      icon: Sun,
    },
    {
      label: "Refresh rate",
      value: product.tauxRafraichissementHz
        ? `${Math.floor(product.tauxRafraichissementHz)} Hz`
        : null,
      icon: RefreshCcw,
    },
    {
      label: "Énergie",
      value: product.puissanceWatts
        ? `${Math.floor(product.puissanceWatts)} W`
        : null,
      icon: PlugZap,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      className="container mx-auto  px-2 mt-4"
    >
      <BackButton />
      <div className="mt-4 grid lg:grid-cols-2 gap-6">
        <div className="relative min-h-[400px] sm:max-h-[600px] rounded-2xl  bg-white overflow-hidden">
          <ProductImage
            productImage={product.imageUrl}
            productNom={product.nom}
          />
        </div>

        <div className="p-4 flex flex-col gap-6 md:self-start  lg:sticky lg:top-4">
          <p className="text-xs uppercase font-bold tracking-widest bg-primary-500 px-2 py-1 text-white self-start rounded-full ">
            {categoryLabels[product.category as keyof typeof categoryLabels] ||
              product.category}
          </p>
          <div>
            <h3 className="text-3xl font-bold">{product.nom}</h3>
            <p className="text-sm text-neutral-500 font-semibold uppercase">
              {product.fabricant}
            </p>
          </div>
          <div>
            <ProductActions product={product} />
          </div>
        </div>
      </div>

      <div className="mt-12 grid lg:grid-cols-2 gap-6 font-text items-start">
        <div className="border border-gray-200 p-6 flex flex-col gap-4 rounded-2xl lg:sticky lg:top-4">
          <InfoHeader>Description</InfoHeader>
          <p className="whitespace-pre-line text-neutral-600">
            {product.description}
          </p>
        </div>
        <div className="border border-gray-200 p-6  flex flex-col gap-4 rounded-2xl lg:sticky lg:top-4">
          <InfoHeader>Spécification</InfoHeader>
          <div className="flex flex-col">
            {productDetails.map(
              (detail, index) =>
                detail.value && (
                  <ProductDetail key={index} icon={detail.icon}>
                    {detail.label} : <strong>{detail.value}</strong>
                  </ProductDetail>
                )
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

type ProductDetailProps = {
  icon: ElementType;
  children: ReactNode;
};

function ProductDetail({ icon: Icon, children }: ProductDetailProps) {
  return (
    <div className="p-6 flex gap-2 border-b border-dashed border-gray-300 last:border-none ">
      <Icon className={"text-primary-500"} />
      <p>{children}</p>
    </div>
  );
}

function InfoHeader({ children }: { children: ReactNode }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold font-oswald uppercase mb-1">{children}</h3>
      <span className="h-1 w-1/6 rounded bg-primary-500 block"></span>
    </div>
  );
}
