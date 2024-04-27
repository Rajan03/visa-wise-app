import { Badge } from "../ui";

export function AssignToTag({ assignedTo }: { assignedTo: string | undefined }) {

  return (
    <Badge variant={assignedTo ? "default": "destructive"}>
      {assignedTo ? assignedTo : "Unassigned"}
    </Badge>
  );
}