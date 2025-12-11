import ProductListSkeleton from "@/components/Products/product-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="container mx-auto min-h-[90svh] px-2">
      <Skeleton className="flex flex-wrap gap-6 justify-center sm:justify-start items-center pt-8 bg-transparent ">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            className="bg-primary-100 h-10 w-24 rounded-full"
          />
        ))}
      </Skeleton>

      <ProductListSkeleton cardLength={8} />
    </section>
  );
};

export default Loading;
