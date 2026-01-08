import { IconX, IconCheck } from '@tabler/icons-react';
import { Notification } from '@mantine/core';

export default function NotificationsToast({txt,title,onClose,classToast}) {
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;
  return (
    <>
      <Notification  onClose={onClose} classNames={{root:`${classToast} !fixed  !right-[15px] !top-0  !bg-black`,description:'!text-white !font-medium'}} icon={checkIcon} color="teal" title={title} mt="md">
        {txt}
      </Notification>
    </>
  );
}