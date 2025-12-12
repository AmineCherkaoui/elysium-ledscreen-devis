"use client";

import { cn } from "@/lib/utils";
import { IconDownload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-ignore
      navigator.standalone
    ) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          setIsInstalled(true);
        } else {
          setIsInstalled(false);
        }

        setDeferredPrompt(null);
      });
    }
  };

  if (deferredPrompt && !isInstalled) {
    return (
      <SidebarMenuItem className="list-none">
        <SidebarMenuButton
          className={cn("cursor-pointer bg-primary-100 text-primary-500")}
          onClick={handleInstallClick}
          asChild
          tooltip={"Install App"}
        >
          <div className="flex items-center gap-2">
            <IconDownload />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return null;
}
