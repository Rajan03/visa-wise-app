import { PageProps } from "@/types";

export default function OnboardingLayout({ children, params }: PageProps) {
  console.log(params); 
  return <div className="flex flex-col min-h-screen">{children}</div>;
}