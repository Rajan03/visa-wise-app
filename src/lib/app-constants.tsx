import {
  CardStackIcon,
  CubeIcon,
  FaceIcon,
  LightningBoltIcon,
  MixerVerticalIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

export const APP_SUBSCRIPTION_COST = 100;
export const navOptions = [
  {
    label: "Dashboard",
    value: <CubeIcon className="text" height={16} width={16} />,
    href: "",
  },
  {
    label: "Leads",
    value: <LightningBoltIcon className="text" height={16} width={16} />,
    href: "/leads",
  },
  {
    label: "Workflows",
    value: <CardStackIcon className="text" height={16} width={16} />,
    href: "/workflows",
  },
  {
    label: "Clients",
    value: <FaceIcon className="text" height={16} width={16} />,
    href: "/clients",
  },
  {
    label: "Team Members",
    value: <PersonIcon className="text" height={16} width={16} />,
    href: "/team-members",
  },
  {
    label: "Settings",
    value: <MixerVerticalIcon className="text" height={16} width={16} />,
    href: "/settings",
  },
];
