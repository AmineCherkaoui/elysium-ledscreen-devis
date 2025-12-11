import { footerLinks } from "@/constants";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const socialMediaInfo = [
  {
    icon: Facebook,
    link: "#",
  },
  {
    icon: Instagram,
    link: "https://www.instagram.com/elysium.ma",
  },
];

export default function Footer() {
  return (
    <footer className="rounded-lg mt-12">
      <div className="w-full container mx-auto p-4 md:py-8">
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link href="/" className=" w-18 h-9 md:w-24 md:h-12 relative">
            <Image
              src="/logo/logo.png"
              fill
              alt="Elysium Logo"
              className="invert-100 hover:invert-75"
            ></Image>
          </Link>
          <ul className="flex flex-wrap items-center justify-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {footerLinks.map((link) => (
              <li key={link.url}>
                <Link href={link.url} className="hover:underline me-4 md:me-6">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between"></div>

        <div className="flex  items-center flex-col sm:flex-row sm:justify-between">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://www.elysium.ma"
              target="_blank"
              className="hover:underline"
            >
              Elysium
            </a>{" "}
            — Tous droits réservés.
          </span>
          <div className="flex sm:justify-center gap-4 mt-4 sm:mt-0">
            {socialMediaInfo.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.link}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-500"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
