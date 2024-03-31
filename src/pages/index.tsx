import { Hero } from "@/components/site";
import { SiteLayout } from "@/layouts";

export default function Home() {
  return (
    <SiteLayout>
      <div className="flex-1">
        <div className="min-h-[40rem] flex justify-center items-center">
          <Hero />
        </div>

        <div className="min-h-[40rem] flex flex-col justify-center bg-gray-100 dark:bg-gray-800">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center">Features</h2>
            <p className="text-lg font-medium text-center">
              VisaWise is the platform that streamlines and simplifies the visa
              application process for individuals and businesses.
            </p>
          </div>
        </div>

      </div>
    </SiteLayout>
  );
}
