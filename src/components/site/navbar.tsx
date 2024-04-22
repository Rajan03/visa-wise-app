import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks";
import { Button } from "@/components/ui";
import { Logo } from "@/components/site";

export function SiteNavbar() {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background h-16 fixed top-0 flex items-center w-full px-6 py-4 shadow",
        scrolled && "border-b shadow-md transition-all duration-300 ease-in-out"
      )}
    >
        <Logo />

      <div className="md:ml-auto flex items-center gap-x-8">
        <Button variant={"ghost"}>
          Contact
        </Button>
      </div>
    </div>
  );
}
