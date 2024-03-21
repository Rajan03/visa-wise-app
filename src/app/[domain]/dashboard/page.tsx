import { getServerSession } from "next-auth";

export default async function AppDashboard() {
  const session = await getServerSession();
  return (
    <>
      <p className="text-3xl font-bold">App Dashboard</p>
      <p>
        <strong>Session:</strong> {JSON.stringify(session, null, 2)}
      </p>
    </>
  );
}
