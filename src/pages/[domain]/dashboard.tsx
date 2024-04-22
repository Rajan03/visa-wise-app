import { DashboardLayout, DomainLayout } from "@/layouts";

export default function DomainDashboard() {
  return (
    <DomainLayout>
      <DashboardLayout>
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </div>
        
      </DashboardLayout>
    </DomainLayout>
  );
}
