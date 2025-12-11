"use client";

import {
    IconDotsVertical,
    IconLogout,
    IconUserCircle,
} from "@tabler/icons-react";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import {useUser} from "@/context/userContext";
import {logout} from "@/lib/actions/auth";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

export function NavUser() {
    const {isMobile, setOpenMobile} = useSidebar();
    const router = useRouter();
    const user = useUser()!;

    const handleSignOut = async () => {
      toast.success("Déconnexion réussie.");
      router.push("/api/logout");
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Profile user={user}/>
                            <IconDotsVertical className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) border-neutral-200 min-w-56 rounded-lg font-text"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={isMobile ? 8 : 16}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Profile user={user}/>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link
                                    onClick={() => setOpenMobile(false)}
                                    href={"/sys_dashboard/account"}
                                >
                                    <IconUserCircle/>
                                    Account
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem asChild>
                            <button className="w-full" onClick={handleSignOut}>
                                <IconLogout/>
                                Log out
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

function Profile({
                     user,
                 }: {
    user: {
        name: string;
        email: string;
        image?: string | null | undefined;
    };
}) {
    return (
        <>
            <Avatar className="h-8 w-8 rounded-lg grayscale">
                {user.image ? (
                    <AvatarImage src={user.image} alt={user.name}/>
                ) : (
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                )}
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight font-text">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
          {user.email}
        </span>
            </div>
        </>
    );
}
