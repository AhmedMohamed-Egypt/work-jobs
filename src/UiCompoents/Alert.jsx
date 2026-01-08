import { Alert } from "@mantine/core";

export default function AlertError({ children, color }) {
  return (
    <Alert variant="light" classNames={{root:'!p-2 !mt-2',message:'!font-semibold'}} color={color} radius="md" title="">
      {children}
    </Alert>
  );
}
