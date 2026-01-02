import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Text } from '~/components/ui/text';
import React, { useCallback, useState } from 'react';
import { Database, Tables } from '~/utils/database.types';

type menuItem<I> = {
  label: I;
  value: any;
};
const DropDown = <T, I, S>({
  data,
  inintialValue,
  setState,
}: {
  data: menuItem<I>[];
  setState: React.Dispatch<React.SetStateAction<S>>;
  inintialValue?: I;
}) => {
  const [visibleValue, setVisibleValue] = useState<I | null>(null);
  const handleItemPress = useCallback(
    (item: menuItem<I>) => {
      setVisibleValue(item.label);
      setState(item.value);
    },
    [setState]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="defaultPressable childContainer defaultBorder bg-neutral-300">
        <Text className="defaultText">
          {'مستوي الأشتراك ->  ' + (visibleValue ?? inintialValue)}
        </Text>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Text>الأشتراكات المتاحة</Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.map((i, index) => {
          return (
            <DropdownMenuItem
              key={index}
              onPress={() => {
                handleItemPress(i);
              }}>
              <Text className="defaultText">{i.label as string}</Text>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
