import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import {  TextInput, useMantineTheme } from "@mantine/core";

export function SearchInput(props) {
  const theme = useMantineTheme();

  return (
    <TextInput
      size="md"
      placeholder={props.text}
      rightSectionWidth={42}
      rightSection={
       <IconSearch size={18} stroke={1.5} />
      }
      classNames={props.classes}
      {...props}
    />
  );
}
