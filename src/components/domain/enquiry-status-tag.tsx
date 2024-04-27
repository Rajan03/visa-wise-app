import { EnquiryStatus } from "@/types";
import { Badge } from "../ui";
import { cn } from "@/lib/utils";

export function EnquiryStatusTag({ status }: { status: EnquiryStatus }) {
  const statusColor = {
    [EnquiryStatus.NEW]: "bg-primary",
    [EnquiryStatus.IN_PROGRESS]: "bg-blue-50 hover:bg-blue-50 text-blue-700",
    [EnquiryStatus.PENDING]: "bg-yellow-50 hover:bg-yellow-50 text-yellow-700",
    [EnquiryStatus.APPROVED]: "bg-green-50 hover:bg-green-50 text-green-700",
    [EnquiryStatus.REJECTED]: "bg-red-50 hover:bg-red-50 text-red-700",
    [EnquiryStatus.CLOSED]: "bg-gray-500",
  };

  return (
    <Badge variant={"default"} className={cn(statusColor[status], '')}>
      {status}
    </Badge>
  );
}