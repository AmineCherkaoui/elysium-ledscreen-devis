import { contactInfo } from "@/constants";
import * as motion from "motion/react-client";
import { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contactez-nous | Elysium",
  description:
    "Contactez-nous pour toute demande d'information, devis ou assistance. Réponse rapide garantie.",
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4">
        <div className="text-white lg:col-span-4 bg-gradient-to-tl from-primary-600 to-primary-500 rounded-3xl px-8 py-8 flex flex-col">
          <h1 className="text-3xl font-semibold font-oswald">Contactez-nous</h1>
          <p className="text-sm mt-3 font-text leading-6">
            Vous avez une question, une demande de renseignement ou besoin
            d’assistance ? Remplissez le formulaire ci-dessous et nous vous
            répondrons dans les plus brefs délais.
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

          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-xs font-text opacity-90 leading-relaxed">
              <strong className="font-semibold">Réponse rapide :</strong> Notre
              équipe s'engage à vous répondre dans les meilleurs délais.
            </p>
          </div>
        </div>
        <ContactForm className="sticky top-4 lg:col-span-8 lg:px-12 py-4 px-4 self-start" />
      </div>
    </motion.section>
  );
};

export default page;
