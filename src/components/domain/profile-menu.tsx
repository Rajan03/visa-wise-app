import { Dropdown } from "@/components/ui";
import { DomainLink } from "@/hoc";
import { useDomain, useProfileMenu } from "@/hooks";
import { AuthService } from "@/services";
import { LogOut } from "lucide-react";
import Link from "next/link";

type ProfileMenuProps = React.PropsWithChildren<{}>;
export const AdminProfileMenu = (props: ProfileMenuProps) => {
  const { isOpen, toggle } = useProfileMenu();

  const onLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Dropdown.Root open={isOpen} onOpenChange={toggle}>
        <Dropdown.Trigger asChild>{props.children}</Dropdown.Trigger>
        <Dropdown.Content className="w-48">
          <Dropdown.Label>My Account</Dropdown.Label>
          <Dropdown.Separator />
          <Dropdown.Item>
            <DomainLink href="/dashboard">Dashboard</DomainLink>
          </Dropdown.Item>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Subscription</Dropdown.Item>

          <Dropdown.Separator />
          <Dropdown.Label>Settings</Dropdown.Label>
          <Dropdown.Separator />
          <Dropdown.Item>Preferences</Dropdown.Item>
          <Dropdown.Item>Notifications</Dropdown.Item>
          <Dropdown.Item>Security</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item onClick={onLogout} className="flex items-center gap-1">
            <LogOut size={14} className="mt-[3px]" />
            <span>Log Out</span>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  );
};

export const UserProfileMenu = (props: ProfileMenuProps) => {
  const { isOpen, toggle } = useProfileMenu();

  const onLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Dropdown.Root open={isOpen} onOpenChange={toggle}>
        <Dropdown.Trigger asChild>{props.children}</Dropdown.Trigger>
        <Dropdown.Content className="w-48">
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Notifications</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item onClick={onLogout} className="flex items-center gap-1">
            <LogOut size={14} className="mt-[3px]" />
            <span>Log Out</span>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  );
};