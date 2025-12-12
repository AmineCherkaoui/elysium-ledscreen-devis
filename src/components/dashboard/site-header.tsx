"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useHeaderTitle } from "@/context/adminHeaderContext";
import InstallPWA from "../pwa-install";

export function SiteHeader() {
  const title = useHeaderTitle()!.title;

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-neutral-300  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex justify-between items-center gap-4 w-full">
          <h1 className="text-base font-bold">{title}</h1>
          <InstallPWA />
        </div>
      </div>
    </header>
  );
}
