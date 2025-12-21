import { useEffect, useState } from "react";
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';
import profileBkGround from "../assets/bkground-profile.png";
import profileContractor from "../assets/profile.png";
import { IMAGES } from "../constatnts/images";
import ButtonDefault from "../UiCompoents/Button";
import ModalMaintin from "../UiCompoents/ModalMaintin";
import FormProfile from "../UiCompoents/FormProfile";
import { useSelector } from "react-redux";
import NotificationsToast from "../UiCompoents/Notifications";
function ProfileContents() {
  const [open, setOpen] = useState(false);
  const { name, jobTitle, imgLink, errorUpload, uploading } = useSelector(
    (store) => store.profileData
  );
  const [visible, setVisible] = useState(false)
  const [notify,setNotify] = useState(false)
   useEffect(() => {
  setVisible(uploading);
  setOpen(uploading)
   setNotify((not)=>uploading==false?!not:not)
     const timer = setTimeout(() => {
    setNotify(false);
  }, 3000);

  return () => clearTimeout(timer);
}, [uploading,errorUpload]);

  return (
    <div className="w-3xl max-w-full bg-white border border-grey50 rounded-[10px] ">
     {notify&&<NotificationsToast txt={'Profile Changed Successfully'}/>}
      <div
        className="h-50 bg-cover bg-position-x-center"
        style={{ backgroundImage: `url(${profileBkGround})` }}
      ></div>

      <div className="pl-5 -translate-y-10 relative">
        <ModalMaintin
          openVal={open}
          onClick={() => setOpen(false)}
          title={"Edit Profile"}
          classes={{ title: "!text-xs1 !font-semibold" }}
        >
          <FormProfile />
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
           
        </ModalMaintin>
        <div className="w-[90px] h-[90px] rounded-full  ">
          <img
            className=" rounded-full border-6 border-green-500 w-full h-full"
            src={imgLink?imgLink:profileContractor}
            alt=""
          />
        </div>
        <div className="flex items-center">
          <h3 className="font-roboto font-normal text-2xl m-0 pr-3">
            {name||'Samuel Fessehaye'}
          </h3>
          <h2 className="font-roboto font-semibold text-green text-2xl pl-3 relative after:absolute after:top-[8px] after:left-0 after:w-0.5 after:h-[20px] after:bg-green">
            Contractor
          </h2>
        </div>
        <div className="font-roboto font-normal text-xs1 flex items-center">
          <h4 className="pr-2">{jobTitle||"Contractor"}</h4>
          <h4
            className="px-2 relative after:absolute after:top-1 after:left-0 after:w-px after:h-[18px] after:bg-black 
                before:absolute before:top-1 before:right-0 before:w-px before:h-[18px] before:bg-black
                "
          >
            4.4 star review
          </h4>
          <h4 className="pl-2">72 jobs completed</h4>
        </div>
        <h4 className="text-black60 font-normal text-xsss">Columbus OH</h4>
        <div className="flex items-center my-5">
          <div className="flex items-center ">
            {Array.from({ length: 3 }).map((_, index) => (
              <img
                key={index}
                style={{ transform: `translateX(-${index * 10}px)` }}
                src={IMAGES[`img${index + 1}`]}
                alt=""
              />
            ))}
          </div>
          <p className="text-black60 font-normal text-xsss translate-x-[-10px]">
            Others in your industry
          </p>
        </div>

        <ButtonDefault
          onClick={() => setOpen(true)}
          text="Edit Profile"
          classes={{
            root: "!py-[8px] !px-[25px] !h-auto text-xs1 !bg-tailblack !rounded-[20px] !font-robto !font-smeibold",
          }}
        />
      </div>
    </div>
  );
}

export default ProfileContents;
