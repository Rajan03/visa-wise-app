import { Button } from "@/components/ui";

export function FreePlan() {
  return (
    <div className="shadow p-4 rounded border min-w-[20rem] max-w-[20rem]">
      {/* Header */}
      <div className="text-center p-3 bg-gradient-to-tr from-gray-400 to-gray-200 text-gray-900">
        Free Plan
      </div>

      {/* Body */}
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-3xl font-bold mb-4">
          $0
          <span className="text-gray-500 text-base">/mo</span>
        </p>
        <p className="text-gray-500 text-xs mb-2">Great for small businesses</p>
        <p className="text-gray-700 text-center text-xs leading-tight mb-6">
          Manage your visa applications with ease and get access to all the
          features
        </p>

        {/* Button */}
        <OnBoardButton />
      </div>

      {/* Footer - features */}
      <div className="px-4 pb-4">
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">Unlimited Applications</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">Unlimited Users</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">24/7 Support</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function PaidPlan() {
  return (
    <div className="shadow p-4 rounded border min-w-[20rem] max-w-[20rem]">
      {/* Header */}
      <div className="text-center p-3 bg-gradient-to-tr from-purple-400 to-purple-200 text-gray-900">
        Premuim Plan
      </div>

      {/* Body */}
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-3xl font-bold mb-4">
          $99
          <span className="text-gray-500 text-base">/mo</span>
        </p>
        <p className="text-gray-500 text-xs mb-2">Great for small businesses</p>
        <p className="text-gray-700 text-center text-xs leading-tight mb-6">
          Manage your visa applications with ease and get access to all the
          features
        </p>

        {/* Button */}
        <OnBoardButton />
      </div>

      {/* Footer - features */}
      <div className="px-4 pb-4">
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">Unlimited Applications</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">Unlimited Users</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm">24/7 Support</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function OnBoardButton() {
  const redirectOnBoard = () => {
    alert("Redirect to onboarding");
  };
  return (
    <Button onClick={redirectOnBoard} variant="default" className="w-full mb-3">
      Get Started
    </Button>
  );
}
