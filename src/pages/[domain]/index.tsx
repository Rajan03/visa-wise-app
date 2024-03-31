import { useDomain } from "@/hooks";
import { DomainLayout } from "@/layouts";

export default function DomainPage() {
  const {domain} = useDomain();

  return (
    <DomainLayout>
      <div className="text-2xl font-bold text-center mt-4">
        Domain: {domain?.orgName}
      </div>
    </DomainLayout>
  );
}
