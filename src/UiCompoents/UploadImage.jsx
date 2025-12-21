
import { FileButton, Button, Group, Text } from "@mantine/core";
function UploadImage({ classButton,onChange,file,setFile }) {
 
  return (
    <>
      <Group>
        <FileButton onChange={onChange} setFile={setFile} accept="image/png,image/jpeg">
          {(props) => (
            <Button classNames={classButton} {...props}>
              Upload image
            </Button>
          )}
        </FileButton>
      </Group>

      {file && (
        <Text
          classNames={{
            root: "!text-left !bg-green !p-1 !pl-3 !rounded-[14px] !text-white",
          }}
          size="sm"
          ta="center"
          mt="sm"
        >
          Picked file: {file.name}
        </Text>
      )}
    </>
  );
}

export default UploadImage;
