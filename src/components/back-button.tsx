"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className="px-4 py-1 flex justify-center items-center rounded-full cursor-pointer uppercase font-oswald transition-all hover:bg-primary-50 hover:text-primary-500"
      onClick={() => router.back()}
      variant={"ghost"}
    >
      <span>
        {" "}
        <ChevronLeft />
      </span>
      <span>Retour</span>
    </Button>
  );
};

export default BackButton;
