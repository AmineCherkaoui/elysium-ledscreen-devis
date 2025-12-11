import { CalendarClock, Handshake, Package, Wrench } from "lucide-react";
import * as motion from "motion/react-client";
import SectionsHeading from "./section-heading";
export const services = [
  {
    icon: Package,
    title: "Vente d’écrans LED",
    description:
      "Investissez dans la qualité avec nos écrans LED durables, disponibles en différentes tailles et résolutions.",
  },
  {
    icon: CalendarClock,
    title: "Location d’écrans LED",
    description:
      "Solutions flexibles pour vos événements : concerts, salons, conférences, mariages ou campagnes publicitaires.",
  },
  {
    icon: Wrench,
    title: "Installation & Maintenance",
    description:
      "Nous assurons la livraison, l’installation professionnelle et le suivi technique de vos écrans.",
  },
  {
    icon: Handshake,
    title: "Conseil & Accompagnement",
    description:
      "Notre équipe vous aide à choisir l’écran idéal selon votre usage : intérieur, extérieur, publicité ou événementiel.",
  },
];

export default function ServiceSection() {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0, scale: 0.9 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      id="services"
      className="flex flex-col gap-12 py-12"
    >
      <SectionsHeading
        title="Nos Services"
        description="Nous vous accompagnons dans tous vos projets d’affichage LED, de l’achat à l’installation, avec
                   des solutions sur mesure."
      />
      <div className="grid grid-cols-1 md:grid-cols-12  gap-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
                ease: [0.25, 0.8, 0.25, 1],
              }}
              key={service.title}
              className="md:col-span-6  flex flex-col gap-4   p-6 rounded-2xl"
            >
              <Icon
                size={64}
                className="p-4 bg-primary-600 text-white flex rounded-2xl"
              />

              <h3 className="font-oswald text-2xl font-bold">
                {service.title}
              </h3>
              <p className="text-gray-600 ">{service.description}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
