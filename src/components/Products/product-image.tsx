"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductImage({
  productImage,
  productNom,
}: {
  productImage: string | null;
  productNom: string;
}) {
  const [imgSrc, setImgSrc] = useState(
    productImage || "/images/placeholder.png"
  );
  return (
    <Image
      className="object-cover group-hover:scale-105 transition-all  duration-400"
      src={imgSrc}
      alt={productNom}
      fill
      onError={() => setImgSrc("/images/placeholder.png")}
    />
  );
}
