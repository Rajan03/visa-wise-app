import { useDomain } from "@/hooks";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

export function DomainLink(props: React.PropsWithChildren<LinkProps & {className?: string}>) {
  const { domainDoc } = useDomain();
  const {asPath} = useRouter();
  const {href, ...rest} = props;
  
  if (!domainDoc) return null;
  
  const path = '/' + domainDoc.id + href;
  const isSameRoute = asPath === path;
  
  const className = cn(
    props.className,
    isSameRoute ? 'text-primary font-semibold' : '',
  );

  return (
    <Link {...rest} className={className} href={path}>
      {props.children}
    </Link>
  );
}
