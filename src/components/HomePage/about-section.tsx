import { Handshake, Target } from "lucide-react";
import * as motion from "motion/react-client";
import SectionsHeading from "./section-heading";

export default function AboutSection() {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0, scale: 0.9 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      id="about"
      className="flex flex-col gap-12 py-12"
    >
      <SectionsHeading
        title="Qui sommes-nous ?"
        description="Nous sommes une entreprise spécialisée dans la
                        vente et la location d’écrans LED professionnels, conçus pour répondre aux exigences des
                        environnements modernes et dynamiques."
      />

      <div className="grid md:grid md:grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className="flex flex-col gap-4 col-span-6 bg-primary-700 text-white p-6 sm:p-12 rounded-3xl hover:shadow"
        >
          <Target size={64} />
          <h3 className="text-3xl font-bold font-oswald">Notre mission</h3>
          <p className="text-primary-100">
            Apporter visibilité, impact et innovation à vos projets grâce à des
            solutions d’affichage performantes et sur mesure.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className="flex flex-col gap-4 col-span-6 bg-primary-700 text-white p-6 sm:p-12 rounded-3xl hover:shadow"
        >
          <Handshake size={64} />
          <h3 className="text-3xl font-bold font-oswald">Notre engagement</h3>
          <p className="text-primary-100">
            Avec une équipe expérimentée et un service client dédié, nous vous
            accompagnons à chaque étape — de la sélection du produit à
            l’installation — en garantissant qualité, fiabilité et satisfaction
            totale.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
