import { contactInfo } from "@/constants";
import * as motion from "motion/react-client";
import { Metadata } from "next";
import { DevisForm } from "./devis-form";

export const metadata: Metadata = {
  title: "Demande de Devis | Elysium",
  description:
    "Demandez votre devis personnalisé gratuitement. Notre équipe vous répond rapidement avec une offre adaptée à vos besoins.",
};

const page = async () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      className="container mx-auto px-2"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 ">
        <div className="text-white lg:col-span-4 bg-gradient-to-tl from-primary-600 to-primary-500 rounded-3xl px-8 py-8 flex flex-col ">
          <h1 className="text-3xl font-semibold font-oswald">
            Demande de Devis
          </h1>
          <p className="text-sm mt-3 font-text leading-6">
            Obtenez un devis personnalisé et gratuit pour votre projet.
            Remplissez le formulaire avec vos besoins et nous vous proposerons
            une offre détaillée sous 24-48 heures.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.title} className="flex items-start gap-4">
                  <span className="bg-white/20 backdrop-blur-xl rounded-full p-3 text-white flex-shrink-0">
                    <Icon size={20} strokeWidth={2.5} />
                  </span>

                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold font-text">
                      {info.title}
                    </h3>
                    {info.href ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-text text-sm hover:underline underline-offset-4 transition-all mt-0.5"
                        href={info.href}
                      >
                        {info.info}
                      </a>
                    ) : (
                      <p className="font-text text-sm mt-0.5 opacity-95">
                        {info.info}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-auto pt-8 border-t border-white/20 ">
            <p className="text-xs font-text opacity-90 leading-relaxed">
              <strong className="font-semibold">Réponse rapide :</strong> Notre
              équipe s'engage à vous répondre dans les meilleurs délais avec un
              devis détaillé et transparent.
            </p>
          </div>
        </div>

        <DevisForm className="sticky top-4 lg:col-span-8 lg:px-12 py-4 px-4 self-start" />
      </div>
    </motion.section>
  );
};

export default page;
