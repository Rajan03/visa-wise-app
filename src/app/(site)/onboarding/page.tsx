import { OnboardingForm } from "../_components";

export default function OnboardingPage() {
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4 pt-2 container">
      {/* Header */}
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-2xl font-bold">Welcome to VisaWise! 🎉</h1>
        <p className="text-sm text-center text-gray-500">
          We&apos;re excited to help you get started on your journey. Please
          fill out the form below to get started.
        </p>
      </div>

      {/* Form */}
      <OnboardingForm />
    </div>
  );
}
