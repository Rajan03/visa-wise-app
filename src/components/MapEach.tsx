import { Children } from "react";

export function Each<T>({
  render,
  of,
}: {
  render: (item: T, index: number) => React.ReactNode;
  of: T[];
}) {
  return Children.toArray(of.map((item, index) => render(item, index)));
}
