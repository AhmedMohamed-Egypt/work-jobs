import { Modal } from "@mantine/core";
const ModalMaintin = ({children, openVal, onClick ,title,classes}) => {
  return (
    <>
      <Modal opened={openVal} onClose={onClick} title={title} classNames={classes}>
        {children}
      </Modal>
    </>
  );
};

export default ModalMaintin;
