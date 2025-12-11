"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileLinks = () => {
  const pathName = usePathname();

  function isCurrentPath(link: string) {
    return pathName.startsWith(link);
  }

  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger className="cursor-pointer">
          <Menu size={"32"} />
        </SheetTrigger>
        <SheetContent className="bg-black/40 backdrop-blur-lg border-white/30 text-white">
          <SheetHeader className="mt-24">
            <SheetTitle></SheetTitle>
            <div className="flex flex-col justify-between gap-12">
              <ul className="flex flex-col gap-6">
                {navBarLinks.map((link, index) => (
                  <motion.li
                    key={link.url}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.5,
                      ease: [0.25, 0.8, 0.25, 1],
                    }}
                  >
                    <SheetClose asChild>
                      <Link
                        className={cn(
                          "font-oswald text-2xl font-bold hover:text-primary-500 transition",
                          {
                            "text-primary-500 hover:text-primary-500":
                              isCurrentPath(link.url),
                          },
                          {
                            "bg-primary-500  py-1 px-5 text-white rounded-full":
                              link.variant === "button",
                          }
                        )}
                        href={link.url as any}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  </motion.li>
                ))}
              </ul>
            </div>
          </SheetHeader>
          <SheetClose asChild>
            <button className="absolute top-8 right-4 rounded-full p-2 cursor-pointer hover:bg-muted transition">
              <X size={32} />
            </button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileLinks;
