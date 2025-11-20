import { useState } from "react";
import { IconInfoCircle } from "@tabler/icons-react";
import { Center, PasswordInput, Text, TextInput, Tooltip } from "@mantine/core";
import styles from "./inputEmailPassword.module.scss";

function TooltipIcon({email,onChangeEmail,errorEmail}) {
  
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
      rightSection={ rightSection}
      placeholder="Email"
      classNames={{
        input: `!py-[10px] !h-auto ${errorEmail?'':'!border-black42'} !placeholder-font-roboto !placeholder-black`
      }}
      value={email}
      onChange={onChangeEmail}
      error={`${errorEmail}`}
      
    />
  );
}

function TooltipFocus({pass,onChangePass,errorPass}) {
  const [opened, setOpened] = useState(false);
    const validatePassword = (value) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).{8,}$/;
    return regex.test(value);
  };
  return (
    <Tooltip
      label={
        validatePassword(pass) ? "All good!" : "Password must include at least 6 characters"
      }
      position="bottom-start"
      withArrow
      opened={opened}
      color={validatePassword(pass) ? "teal" : undefined}
      withinPortal
    >
      <PasswordInput
        
        required
        placeholder="Your password"
          classNames={{
          input: `${styles.inputpassword} !py-[27.5px] !h-auto !min-h-auto ${errorPass?'':'!border-black42'} passwordParent`,
        
        }}
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        mt="md"
        value={pass}
        onChange={onChangePass}
        error={errorPass}
      />
    </Tooltip>
  );
}

export function InputTooltip({email,onChangeEmail,errorEmail,pass,onChangePass,errorPass}) {
  return (
    <>
      <TooltipIcon errorEmail={errorEmail} email={email} onChangeEmail={onChangeEmail}  />
      <TooltipFocus pass={pass} onChangePass={onChangePass} errorPass={errorPass} />
    </> 
  );
}
