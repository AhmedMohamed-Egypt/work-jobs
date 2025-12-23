
import { FileButton, Button, Group, Text } from "@mantine/core";
import { useSelector } from "react-redux";
function UploadImage({ classButton,onChange,file,setFile }) {
  
 
  return (
    <>
      <Group classNames={{root:'!flex !items-center mt-5'}}>
        <FileButton onChange={onChange} setFile={setFile} accept="image/png,image/jpeg">
          {(props) => (
            <Button classNames={classButton} {...props}>
              Upload image
            </Button>
          )}
        </FileButton>
        
      {file && (
        <Text
          classNames={{
            root: `!m-0 !text-left !bg-green !p-1 !pl-3 !rounded-[14px] !text-white !px-2 !text-xssss`,
          }}
          size="sm"
          ta="center"
          mt="sm"
        >

         ${file.name}
        </Text>
      )}
      </Group>

    </>
  );
}

export default UploadImage;
