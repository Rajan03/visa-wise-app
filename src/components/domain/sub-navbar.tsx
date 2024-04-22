import { IconType, Icons } from "@/config";
import { DomainLink } from "@/hoc";

export function DashboardSubNav() {
  return (
    <nav className="container mx-auto flex gap-x-8">
      <NavLink href="/dashboard" title="Overview" Icon={Icons.dashboard} />
      <NavLink href="/enquiries" title="Enquiries" Icon={Icons.enquiries} />
      <NavLink href="/cases" title="Cases" Icon={Icons.cases} />
      <NavLink href="/applicants" title="Applicants" Icon={Icons.applicants} />
      <NavLink href="/team" title="Team Members" Icon={Icons.team} />
      <NavLink href="/tasks" title="Tasks" Icon={Icons.tasks} count={5} />
      <NavLink
        href="/file-manager"
        title="File Manager"
        Icon={Icons["file-manager"]}
      />
    </nav>
  );
}

type NavLinkProps = {
  href: string;
  title: string;
  Icon: IconType;
  count?: number;
};
function NavLink({href,title,count, Icon}: NavLinkProps) {
  return (
    <DomainLink className="text-xs hover:text-primary flex items-center" href={href}>
      <Icon className="w-4 h-4" strokeWidth={'1px'} />
      <span className="ml-1.5">{title}</span>
      {count && (
        <span className="ml-1.5 bg-primary text-white text-[9px]  px-1 rounded">
          {count}
        </span>
      )}
    </DomainLink>
  );
}