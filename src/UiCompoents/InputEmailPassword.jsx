import { useState } from "react";
import { IconInfoCircle } from "@tabler/icons-react";
import { Center, PasswordInput, Text, TextInput, Tooltip } from "@mantine/core";
import styles from "./inputEmailPassword.module.scss";

function TooltipIcon() {
  const rightSection = (
    <Tooltip
      label="We store your data securely"
      position="top-end"
      withArrow
      transitionProps={{ transition: "pop-bottom-right" }}
    >
      <Text component="div" c="dimmed" style={{ cursor: "help" }}>
        <Center>
          <IconInfoCircle size={18} stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  );

  return (
    <TextInput
      rightSection={rightSection}
      placeholder="Email"
      classNames={{
        input: "!py-[10px] !h-auto !border-black42 !placeholder-font-roboto !placeholder-black"
      }}
    />
  );
}

function TooltipFocus() {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const valid = value.trim().length >= 6;

  return (
    <Tooltip
      label={
        valid ? "All good!" : "Password must include at least 6 characters"
      }
      position="bottom-start"
      withArrow
      opened={opened}
      color={valid ? "teal" : undefined}
      withinPortal
    >
      <PasswordInput
        
        required
        placeholder="Your password"
          classNames={{
          input: `${styles.inputpassword} !py-[27.5px] !h-auto !min-h-auto !border-black42 passwordParent`,
        
        }}
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        mt="md"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </Tooltip>
  );
}

export function InputTooltip() {
  return (
    <>
      <TooltipIcon />
      <TooltipFocus />
    </>
  );
}
