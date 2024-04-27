import { Dropdown } from "@/components/ui";
import { useEnquiryMenu } from "@/hooks";

type EnquiryMenuProps = React.PropsWithChildren<{id: string}>;
export const EnquiryMenu = (props: EnquiryMenuProps) => {
  const { isOpen, toggle } = useEnquiryMenu();
  const idIsOpen = isOpen.includes(props.id);

  return (
    <>
      <Dropdown.Root open={idIsOpen} onOpenChange={s => toggle(props.id, s)}>
        <Dropdown.Trigger asChild>{props.children}</Dropdown.Trigger>
        <Dropdown.Content className="w-48">
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Subscription</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  );
};
