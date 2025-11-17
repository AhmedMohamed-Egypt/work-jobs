import { Button } from '@mantine/core';

function ButtonDefault({text,classes,onClick}) {
  return <Button classNames={classes}  onClick={onClick}>{text}</Button>;
}

export default ButtonDefault