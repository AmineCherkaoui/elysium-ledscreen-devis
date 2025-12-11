"use client";

import MobileMenu from "@/components/NavBar/mobileMenu";
import { navBarLinks } from "@/constants";
import useScrollInfo from "@/hooks/useScrollInfo";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBarContainer() {
  let pathName = usePathname();
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    setIsHomePage(pathName === "/");
  }, [pathName]);

  function isCurrentPath(link: string) {
    return pathName.startsWith(link);
  }

  const scrollInfo = useScrollInfo();

  const isOverHero = isHomePage ? scrollInfo.isOverHero : false;
  const scrollDirection = isHomePage ? scrollInfo.scrollDirection : "up";

  return (
    <motion.header
      style={{ background: "transparent" }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: scrollDirection === "down" ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "container p-2",
        {
          "text-white": isHomePage,
          "text-black": !isHomePage,
        },
        {
          "fixed-center z-11": isHomePage && !isOverHero,
        },
        { "absolute-center z-11": isHomePage && isOverHero },
        { "static mx-auto mt-4": !isHomePage }
      )}
    >
      <nav
        className={cn(
          "py-3 px-4 md:px-8 flex justify-between gap-4 items-center mx-2 rounded-full",
          {
            "bg-transparent border-transparent ": isOverHero && isHomePage,
            "bg-black/40 text-white shadow backdrop-blur-lg border-2 border-white/30 ":
              !isOverHero && isHomePage,
          }
        )}
      >
        <Link href="/" className="w-18 h-9 md:w-24 md:h-12 relative">
          <Image
            src="/logo/logo.png"
            fill
            alt="Elysium Logo"
            className={cn("hover:invert-25", {
              invert: !isHomePage,
            })}
          />
        </Link>

        <div className="flex items-center gap-4">
          <ul className="hidden md:flex md:gap-4 md:items-center">
            {navBarLinks.map((link) => {
              return (
                <li key={link.label}>
                  <Link
                    aria-disabled={isCurrentPath(link.url)}
                    className={cn(
                      "font-oswald font-medium text-lg hover:text-current/70 transition-all",
                      {
                        "text-primary-500 hover:text-primary-500":
                          isCurrentPath(link.url) && link.variant !== "button",
                      },
                      {
                        "bg-primary-500 py-1 px-5 text-white rounded-full hover:bg-primary-600 hover:text-white ":
                          link.variant === "button",
                      }
                    )}
                    href={link.url as any}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <MobileMenu />
        </div>
      </nav>
    </motion.header>
  );
}
