import { Button } from '@mantine/core';

function ButtonDefault({text,classes,onClick,disabledBtn}) {
  return <Button classNames={classes} disabled={disabledBtn}  onClick={onClick}>{text}</Button>;
}

export default ButtonDefault