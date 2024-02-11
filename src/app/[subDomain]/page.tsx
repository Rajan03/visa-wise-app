import { AppNavigation } from "@/components";

export default function Dashboard() {
  
  return (
    <main className="min-h-screen flex flex-col">
      <AppNavigation />

      <div className="flex-1 bg-gray-50 p-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
    </main>
  );
}
