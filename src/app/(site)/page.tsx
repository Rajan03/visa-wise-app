import { Hero } from "./_components";

export default async function Home() {
  return (
    <div className="flex-1">
      <div className="min-h-[40rem] flex justify-center items-center">
        <Hero />
      </div>

      <div id="features" className="min-h-[40rem] flex flex-col justify-center bg-gray-100 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center">Features</h2>
          <p className="text-lg font-medium text-center">
            VisaWise is the platform that streamlines and simplifies the visa
            application process for individuals and businesses.
          </p>
        </div>
      </div>

      <div id="pricing" className="min-h-[40rem] flex flex-col justify-center">
         <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center">Pricing</h2>
          <p className="text-lg font-medium text-center">
            VisaWise is the platform that streamlines and simplifies the visa
            application process for individuals and businesses.
          </p>
        </div>
      </div>
    </div>
  );
}
