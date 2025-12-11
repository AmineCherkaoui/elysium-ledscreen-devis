import * as motion from "motion/react-client";
import MapInfo from "./map-info";
import SectionsHeading from "./section-heading";

export default function ContactUsSection() {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0, scale: 0.9 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      id="contact"
      className=" flex flex-col gap-12 py-12"
    >
      <SectionsHeading
        title="Contactez-nous"
        description="Notre équipe est à votre écoute pour vous accompagner rapidement et efficacement."
      />

      <MapInfo />
    </motion.section>
  );
}
