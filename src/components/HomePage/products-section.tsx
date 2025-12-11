import { getProducts } from "@/lib/api/products";
import { ArrowRight } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "../Products/product-card";
import ProductListSkeleton from "../Products/product-list-skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionsHeading from "./section-heading";

export const Products = async () => {
  const { products } = await getProducts({ limit: 6 });
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-10/12 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -top-8 right-12 z-1 md:flex items-center gap-1 hidden ">
          <CarouselPrevious className="h-10 w-10 hidden sm:flex text-primary-500 border-primary-500 hover:bg-primary-500 hover:text-white hover:border-primary-500  cursor-pointer " />
          <CarouselNext className="h-10 w-10 hidden sm:flex text-primary-500 border-primary-500 hover:bg-primary-500 hover:text-white hover:border-primary-500  cursor-pointer " />
        </div>
      </Carousel>
    </div>
  );
};

export default function ProductSection() {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0, scale: 0.9 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      id="produits"
      className=" flex flex-col gap-12 py-12"
    >
      <SectionsHeading
        title="Nos Écrans LED"
        description="Découvrez notre sélection d’écrans LED adaptés à
                        tous les environnements et usages professionnels."
      />

      <Suspense fallback={<ProductListSkeleton cardLength={4} />}>
        <Products />
      </Suspense>

      <div className="col-span-full flex justify-center">
        <Link
          className="flex text-lg sm:text-xl items-center gap-2  py-1 hover:text-primary-500 transition-all font-semibold border-b-1 border-transparent hover:border-primary-500"
          href="/produits"
        >
          Voir tous nos produits
          <span>
            <ArrowRight />
          </span>
        </Link>
      </div>
    </motion.section>
  );
}
