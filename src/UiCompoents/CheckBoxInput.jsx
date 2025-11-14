import { Checkbox } from '@mantine/core';
function CheckBoxInput() {
      return (
    <Checkbox
     classNames={{
        root:" font-grotesk !cursor-pointer",
        label:'text-xs !cursor-pointer pl-1!',
        input:'!cursor-pointer'
     }}
      label="Remember me for 30 days"
      color="#000"
      radius="xs"
      size="xs"
    />
  );
}

export default CheckBoxInput




