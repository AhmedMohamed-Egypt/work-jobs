import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from "@mantine/form";
import { Button, Group, TextInput ,Text} from "@mantine/core";
import UploadImage from "./UploadImage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postImageLink } from "../store/profileData";

function FormProfile() {
  const [file, setFile] = useState(null);
 const {errorUpload} = useSelector((store)=>store.profileData)
 
  const dispatch = useDispatch();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      job: "",
      image: null, 
     
    },

    validate: {
      name: hasLength({ min: 2, max: 10 }, "Name must be 2-10 characters long"),
      job: isNotEmpty("Enter your current job"),
      image: (value) => (!value ? "Image is required" : null),
    },
  });
  
  const handleSubmit = () => {
     
    dispatch(
      postImageLink(form.values.name,form.values.job,file, "ml_default")
    );
  };
  const handleSelectImage=(file)=>{
   
   if (!file) return;

  form.setFieldValue("image", file); // ✅ set virtual field
  form.clearFieldError("image");     // ✅ remove error if exists
  }
 
  
  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <TextInput
        label="Name"
        placeholder="Name"
        withAsterisk
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <TextInput
        label="Job Title"
        placeholder="Job Title"
        withAsterisk
        mt="md"
        key={form.key("job")}
        {...form.getInputProps("job")}
      />
      <UploadImage
        onChange={(file)=>{setFile(file),handleSelectImage(file)}}
        file={file}
       
        classButton={{ root: "!bg-black" }}
   
      />
      {form.errors.image&&<Text color="red" size="sm">
    {form.errors.image}
  </Text>}
   

         <Text classNames={{root:'!bg-red-500 !text-white !rounded-[15px] !pl-3 !mt-2'}}>{errorUpload}</Text>
      <Group justify="flex-end" mt="md">
        <Button
          type="submit"
          classNames={{
            root: "!py-[8px] !px-[25px] !h-auto text-xs1 !bg-black !rounded-[20px] !font-robto !font-smeibold",
          }}
     
        >
          Submit
        
        </Button>
       
     
      </Group>
     
    </form>
  );
}

export default FormProfile;
