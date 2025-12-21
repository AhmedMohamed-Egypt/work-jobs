import { IconX, IconCheck } from '@tabler/icons-react';
import { Notification } from '@mantine/core';

export default function NotificationsToast({txt,title}) {
 // const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  return (
    <>
   
      <Notification classNames={{closeButton:'!hidden',root:'!absolute !top-0 !right-2 !bg-black',description:'!text-white !font-medium'}} icon={checkIcon} color="teal" title={title} mt="md">
        {txt}
      </Notification>
    </>
  );
}