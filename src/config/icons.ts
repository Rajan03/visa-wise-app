import { BriefcaseBusiness, CopyCheck, EllipsisVertical, File, Layers3, LayoutDashboard, LucideIcon, MessageSquareCode, MessageSquareReply, PlusCircle, Scroll, SquareCheck, Users2 } from "lucide-react";

export const Icons = {
    dashboard: LayoutDashboard,
    enquiries: Layers3,
    team: Users2,
    applicants: Scroll,
    cases: BriefcaseBusiness,
    tasks: SquareCheck,
    "file-manager": File,
    Add: PlusCircle,
    More: EllipsisVertical,
    Chat: MessageSquareCode,
    Reply: MessageSquareReply,
    Convert: CopyCheck,
}

export type IconType = LucideIcon;