import { FreePlan, PaidPlan } from "../_components";

export default function PricingPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 pt-20">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-2">
          Select a plan that works for you
        </h2>

        <p className="text-lg font-medium text-center text-gray-500">
          We have plans for businesses of all sizes. Compare and find the best
          plan for your business.
        </p>
      </div>
      <div className="flex justify-center items-center gap-8 flex-1">
        <FreePlan />
        <PaidPlan />
      </div>
    </div>
  );
}