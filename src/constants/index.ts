import { IconFileInvoice, IconMail, IconPackage } from "@tabler/icons-react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const contactInfo = [
  {
    title: "Téléphone",
    info: "+212 5 37 70 01 91",
    icon: Phone,
    href: "tel:+212537700191",
  },
  {
    title: "Email",
    info: "contact@elysium.ma",
    icon: Mail,
    href: "mailto:contact@elysium.ma",
  },
  {
    title: "Adresse",
    info: "N°4 2ème étage Imm 11, Av. Al Fadila, CYM, Rabat, Maroc",
    icon: MapPin,
    href: "https://www.google.com/maps/search/?api=1&query=33.987586,-6.870240",
  },
  {
    title: "Horaires",
    info: "Lundi – Vendredi : 9h30 à 18h30 Samedi : 9h30 à 13h30",
    icon: Clock,
  },
];

export const addressLocation =
  "https://maps.google.com/maps?width=100%25&height=600&hl=fr&q=33.987586,-6.870240+(Elysium)&t=&z=16&ie=UTF8&iwloc=B&output=embed";

export const navBarLinks = [
  {
    url: "/produits",
    label: "Nos produits",
  },
  {
    url: "/contact",
    label: "Contactez nous",
  },
  {
    url: "/devis",
    label: "Demande de devis",
    variant: "button",
  },
];

export const footerLinks = [
  {
    url: "/produits",
    label: "Nos produits",
  },
  {
    url: "/contact",
    label: "Contactez nous",
  },
  {
    url: "/devis",
    label: "Demandez un devis",
  },
];

export const adminSideBarItems = [
  {
    title: "Demande devis",
    url: "/sys_dashboard/demande-devis",
    icon: IconFileInvoice,
  },
  {
    title: "Produits",
    url: "/sys_dashboard/products",
    icon: IconPackage,
  },
  {
    title: "Messages de contact",
    url: "/sys_dashboard/contact-messages",
    icon: IconMail,
  },
];

export const categoryLabels = {
  INTERIEUR: "Intérieur",
  EXTERIEUR: "Extérieur",
  MOBILE: "Mobile",
  VITRINE: "Vitrine",
  FLEXIBLE: "Flexible",
};
