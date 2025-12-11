import { ChevronsDown } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      id="hero"
      className="min-h-[600px] h-[100svh] w-full relative overflow-hidden shadow mb-12"
    >
      <Image
        className="object-cover"
        fill
        src={"/images/flexible.png"}
        alt={"Une image d'une Écran LED dans un batiments"}
      />

      <div className="h-full absolute inset-0 z-1 bg-gradient-to-b from-black/30 to-primary-900/80">
        <div className="container mx-auto h-full flex items-center justify-center flex-col   px-6 md:px-12 gap-6 ">
          <h1 className="font-oswald text-center text-2xl md:text-3xl font-bold text-white">
            Vente et Location d’Écrans LED de Haute Qualité
          </h1>

          <p className="text-center text-sm md:text-lg font-light  leading-6 text-white">
            Boostez la visibilité de vos événements, campagnes publicitaires et
            présentations grâce à nos écrans LED dernière génération. Nous
            proposons des solutions de vente et de location sur mesure, adaptées
            à tous les besoins et budgets, pour garantir un impact visuel
            exceptionnel.
          </p>

          <div className="flex gap-6 sm:items-center flex-col sm:flex-row font-oswald">
            <Link
              href="/devis"
              className=" px-4 py-2 text-center text-sm md:text-base rounded-full bg-primary-500 ring-2 ring-primary-500 text-white  hover:bg-primary-600 hover:ring-primary-600  transition-all duration-300"
            >
              Demander un devis
            </Link>
            <Link
              href="/produits"
              className="px-4 py-2 text-center text-sm md:text-base rounded-full ring-2 ring-white text-white hover:bg-white hover:text-primary-500 hover:ring-primary-500  transition-all duration-300"
            >
              Découvrir nos écrans
            </Link>
          </div>

          <motion.div
            animate={{
              y: [10, 0, 10],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <ChevronsDown size={48} className="text-primary-400" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
