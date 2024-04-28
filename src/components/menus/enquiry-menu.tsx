import { Dropdown } from "@/components/ui";
import { Icons } from "@/config";
import { useEnqSidebar, useEnquiryMenu } from "@/hooks";

type EnquiryMenuProps = React.PropsWithChildren<{ id: string }>;
export const EnquiryMenu = (props: EnquiryMenuProps) => {
  const { openId, open, close } = useEnquiryMenu();
  const {open: openDetails} = useEnqSidebar()
  const idIsOpen = Boolean(openId === props.id);

  const toggle = (state: boolean) => {
    if (state) {
      open(props.id);
    } else {
      close();
    }
  };

  return (
    <>
      <Dropdown.Root open={idIsOpen} onOpenChange={toggle}>
        <Dropdown.Trigger asChild>{props.children}</Dropdown.Trigger>
        <Dropdown.Content className="w-48">
          <Dropdown.Item className="font-semibold flex gap-1">
            <Icons.Convert className="w-4 h-4 mt-1" strokeWidth={"2px"} />
            <p>Convert to Case</p>
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item onClick={() => openDetails(props.id)}>
            Detailed Enquiry
          </Dropdown.Item>
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
