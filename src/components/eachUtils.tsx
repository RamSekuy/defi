import { ReactElement, Children, cloneElement } from "react";

type EachUtilsProps<T> = {
  of: readonly T[];
  render: (item: T, index: number) => ReactElement;
  noData?: ReactElement;
};

export default function EachUtils<T>({
  of,
  render,
  noData,
}: EachUtilsProps<T>) {
  if (noData && of.length === 0) return noData;

  return Children.toArray(
    of.map((item, index) => cloneElement(render(item, index), { key: index }))
  );
}
