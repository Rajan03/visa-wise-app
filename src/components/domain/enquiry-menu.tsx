import { Dropdown } from "@/components/ui";
import { Icons } from "@/config";
import { useEnquiryMenu } from "@/hooks";

type EnquiryMenuProps = React.PropsWithChildren<{ id: string }>;
export const EnquiryMenu = (props: EnquiryMenuProps) => {
  const { isOpen, toggle } = useEnquiryMenu();
  const idIsOpen = isOpen.includes(props.id);

  return (
    <>
      <Dropdown.Root open={idIsOpen} onOpenChange={(s) => toggle(props.id, s)}>
        <Dropdown.Trigger asChild>{props.children}</Dropdown.Trigger>
        <Dropdown.Content className="w-48">
          <Dropdown.Item className="font-semibold flex gap-1">
            <Icons.Convert className="w-4 h-4 mt-1" strokeWidth={"2px"} />
            <p>Convert to Case</p>
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item>Detailed Enquiry</Dropdown.Item>
          <Dropdown.Item>Assign Team Member</Dropdown.Item>
          <Dropdown.Item>Chat History</Dropdown.Item>
          <Dropdown.Item>Mark Irrelevant</Dropdown.Item>
          <Dropdown.Item>Notes</Dropdown.Item>
          <Dropdown.Item>Logs</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  );
};
