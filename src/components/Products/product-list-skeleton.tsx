import { Skeleton } from "@/components/ui/skeleton";

const ProductListSkeleton = ({ cardLength }: { cardLength: number }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12">
      {Array.from({ length: cardLength }).map((_, i) => {
        return (
          <div key={i} className="rounded-2xl overflow-hidden ">
            <div className="relative  h-48">
              <Skeleton className="h-full w-full bg-primary-100" />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <Skeleton className="h-6 w-10/12 bg-primary-100" />
              <Skeleton className="h-4 w-5/12 bg-primary-100" />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ProductListSkeleton;
