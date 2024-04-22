import { useDomain } from "@/hooks";
import Link, { LinkProps } from "next/link";

export function DomainLink(props: React.PropsWithChildren<LinkProps & {className?: string}>) {
  const { domainDoc } = useDomain();
  const {href, ...rest} = props;

  if (!domainDoc) {
    return null;
  }

  const path = '/' + domainDoc.id + href;
  console.log({
    path,
    href,
    domainDoc: domainDoc.id,
  });
  
  return (
    <Link {...rest} href={path}>
      {props.children}
    </Link>
  );
}
