import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks";
import { Button } from "@/components/ui";
import { Logo } from "@/components/site";
import { LogIn } from "lucide-react";

export function AppNavbar() {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background h-20 fixed top-0 flex items-center w-full px-6 py-4 shadow",
        scrolled && "border-b shadow-md transition-all duration-300 ease-in-out"
      )}
    >
      <Logo />

      <div className="md:ml-auto flex items-center gap-x-8">
        <Button variant={"ghost"} className="space-x-1 flex items-center">
          <LogIn size={16} />
          <span className="hidden md:inline text-sm">Log In</span>
        </Button>
      </div>
    </div>
  );
}
