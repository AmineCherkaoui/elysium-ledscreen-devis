import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";
import * as motion from "motion/react-client";
import Image from "next/image";
import SectionsHeading from "./section-heading";

export const clients = [
  { name: "Sûreté Nationale", image: "/clients/surete-nationale.png" },
  { name: "Garde Royale", image: "/clients/garde-royale.png" },
  { name: "Alomrane", image: "/clients/alomrane.png" },
  { name: "ANCFCC", image: "/clients/ancfcc.png" },
  { name: "Sorec", image: "/clients/sorec.png" },
  { name: "Cours Comptes", image: "/clients/cours-comptes.png" },
  { name: "Jnane Azzahrae", image: "/clients/jnane-azzahrae.png" },
  { name: "Adolfo Dominguez", image: "/clients/adolfo-dominguez.png" },
  { name: "CBA", image: "/clients/cba.png" },
  { name: "FPM", image: "/clients/fpm.png" },
];

export default function ClientsSection() {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0, scale: 0.9 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      id="clients"
      className=" flex flex-col gap-6 py-12"
    >
      <SectionsHeading
        title="Ils nous font confiance"
        description="Des partenaires qui choisissent notre savoir-faire pour donner vie à leurs projets visuels."
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.8, 0.25, 1],
        }}
        className="flex items-center justify-center"
      >
        <Marquee>
          <MarqueeFade
            side="left"
            className="bg-gradient-to-r from-background to-transparent"
          />
          <MarqueeFade
            side="right"
            className="bg-gradient-to-l from-background to-transparent"
          />

          <MarqueeContent pauseOnHover={false}>
            {clients.map((client, index) => (
              <MarqueeItem key={index} className="h-48 w-48 relative">
                <Image
                  alt={`${client.name} Logo`}
                  className="overflow-hidden invert-70 object-contain"
                  src={client.image}
                  fill
                />
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </motion.div>
    </motion.section>
  );
}
