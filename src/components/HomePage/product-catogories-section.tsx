import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import SectionsHeading from "./section-heading";

const categorySection = [
  {
    style: "md:col-span-4 md:row-span-2",
    title: "Écrans LED Intérieurs",
    description:
      "Idéals pour les salles de conférence, centres commerciaux, studios, et expositions. Offrent une image nette et une installation discrète..",
    image: "/images/interieurs.png",
    href: "/produits?category=INTERIEUR",
  },
  {
    style: "md:col-span-8",
    title: "Écrans LED Extérieurs",
    description:
      "Résistants aux intempéries et dotés d’une haute luminosité, ils sont parfaits pour la publicité en plein air, les façades et les événements extérieurs.",
    image: "/images/exterieurs.png",
    href: "/produits?category=EXTERIEUR",
  },
  {
    style: "md:col-span-8",
    title: "Écrans LED Flexibles",
    description:
      "Ultra-modulables, ces écrans s’adaptent à des formes courbes ou créatives. Parfaits pour les installations artistiques, designs architecturaux, ou espaces innovants.",
    image: "/images/flexible.png",
    href: "/produits?category=FLEXIBLE",
  },
  {
    style: "md:col-span-6",
    title: "Écrans LED Mobiles",
    description:
      "Faciles à transporter et à installer, idéals pour les événements temporaires, tournées, ou présentations itinérantes.",
    image: "/images/mobile.png",
    href: "/produits?category=MOBILE",
  },
  {
    style: "md:col-span-6",
    title: "Écrans LED Vitrine",
    description:
      "Conçus pour les devantures de magasins, ces écrans attirent l’attention tout en laissant transparaître l’intérieur. Idéals pour affichage dynamique, promotions, et branding visuel.",
    image: "/images/vitrine.png",
    href: "/produits?category=VITRINE",
  },
];

export default function ProductCategorySection() {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0, scale: 0.9 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      id="productsType"
      className=" flex flex-col gap-12 py-12"
    >
      <SectionsHeading
        title="Nos Types d'Écrans LED"
        description="Découvrez les différents types d’écrans LED que nous proposons, adaptés à tous vos projets professionnels."
      />

      <div className="grid md:grid md:grid-cols-12  gap-6">
        {categorySection.map((category) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                opacity: {
                  duration: 0.8,
                  ease: "easeInOut",
                },
                y: {
                  duration: 0.4,
                  ease: "linear",
                },
              }}
              key={category.title}
              className={cn(
                category.style,
                "bg-primary-50 rounded-3xl min-h-[300px] relative overflow-hidden hover:shadow-md hover:shadow-primary-500/20 transition-all group"
              )}
            >
              <Link href={category.href as any}>
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 z-10 flex flex-col gap-4 justify-end p-6 bg-gradient-to-b from-transparent to-primary-950/70 text-white hover:to-primary-700/70 group-hover:backdrop-blur-xs transition-all duration-1000 ease-out">
                  <h3 className="text-2xl font-bold font-oswald">
                    {category.title}
                  </h3>
                  <p className="text-sm">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
