"use client";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminSideBarItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type AppSidebarType = {} & ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebarType) {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="border-neutral-300" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:!p-1.5  hover:bg-transparent">
              <Link
                href="/sys_dashboard"
                onClick={() => setOpenMobile(false)}
                className="w-24 h-11.5 hover:bg-transparent hover:invert-50 relative"
              >
                <Image
                  src="/logo/logo.png"
                  fill
                  alt="Elysium Logo"
                  className={"invert-100 scale-75 object-cover"}
                ></Image>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminSideBarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
