import { LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppRoles, AuthUser } from "@/types";
import { Logo } from "@/components/site";
import { useScrollTop, useSignInModal } from "@/hooks";
import { AdminProfileMenu, UserProfileMenu } from "@/components/menus";
import { Button, Avatar, AvatarImage, AvatarFallback } from "@/components/ui";

export function AppNavbar({ user }: { user: AuthUser | null }) {
  const scrolled = useScrollTop();
  const { toggle } = useSignInModal();

  const userAvtar = user && (
    <div className="flex items-center gap-x-2 cursor-pointer">
      <Avatar className="cursor-pointer">
        <AvatarImage src={user.photoURL || ""} />
        <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <span className="hidden md:inline text-sm font-medium">
        {user.displayName || "Unknown"}
      </span>
    </div>
  );

  return (
    <div
      className={cn(
        "z-50 bg-background h-16 fixed top-0 w-full px-6 py-4 shadow",
        scrolled && "border-b shadow-md transition-all duration-300 ease-in-out"
      )}
    >
      <div className="w-full flex items-center container mx-auto">
        <Logo />

        <div className="md:ml-auto flex items-center gap-x-8">
          {!user && (
            <Button
              variant={"ghost"}
              onClick={() => toggle(true)}
              className="space-x-1 flex items-center"
            >
              <LogIn size={16} />
              <span className="hidden md:inline text-sm">Log In</span>
            </Button>
          )}

          {user && user.role !== AppRoles.User && (
            <AdminProfileMenu>{userAvtar}</AdminProfileMenu>
          )}
          {user && user.role === AppRoles.User && (
            <UserProfileMenu>{userAvtar}</UserProfileMenu>
          )}
        </div>
      </div>
    </div>
  );
}
