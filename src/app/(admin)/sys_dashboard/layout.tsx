import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { HeaderTitleProvider } from "@/context/adminHeaderContext";
import { UserProvider } from "@/context/userContext";
import { getCurrentUser } from "@/lib/actions/auth";
import { CSSProperties, ReactNode } from "react";


export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <UserProvider user={user}>
      <HeaderTitleProvider>
        <SidebarProvider
          defaultOpen={false}
          className="font-text"
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as CSSProperties
          }
        >
          <AppSidebar collapsible="icon" variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 ">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </HeaderTitleProvider>
    </UserProvider>
  );
}
