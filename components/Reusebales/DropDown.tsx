import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Text } from '~/components/ui/text';
import React, { useRef, useState } from 'react';

const DropDown = () => {
  const value = useRef('open');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Text>{value.current}</Text>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Text>My Account</Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Text>Profile</Text>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Text>Team</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
