import MapWithMyLocation from "./MapWithMyLocation";
import ModalMaintin from "./ModalMaintin";
import ButtonDefault from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchCityLocation, resetCompletion } from "../store/CityOfficeSlice";
import SpinLoader from "./SpinLoader";
import AlertError from "./Alert";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import NotificationsToast from "./Notifications";

function MapModal({ openMap, setOpenMap, onClick }) {
  const { officeLocation, offLocLoading, offLocError,completed } = useSelector(
    (store) => store.cityOffice
  );
  const [city, setCity] = useState("");
   const [notify,setNotify] = useState(false)
   
  
  
  const dispatch = useDispatch();
  const handelClickLocFun = (locName) => {
    setCity(locName);
  };
  const handleSubmit = () => {
    dispatch(fetchCityLocation({ cityName: city }));
  };
  const handleMarker = () => {
    dispatch(clearError());
    
  };
  useEffect(()=>{
    if(officeLocation&&!offLocError&&!offLocLoading) setNotify(true)
  },[officeLocation,offLocError,offLocLoading])

  
  return (
    <>
     {notify&&<NotificationsToast classToast={notify? "animate-slide-in-left" : ""} onClose={()=>{setNotify(false)}} txt={'Location Changed Successfully'}/> }
{!completed&& <ModalMaintin
        openVal={openMap}
        onClick={onClick}
        setOpenMap={setOpenMap}
        title={" Our Locations"}
        classes={{
          content: "!flex-1 !max-w-[800px]",
          title: "!text-xs1 !font-semibold",
        }}
      >
        <MapWithMyLocation
          handelClickLoc={handelClickLocFun}
          handleMarker={handleMarker}
        />
        <div className="mt-3 flex">
          <>
            {city && (
              <>
                <p className="inline-block bg-petreloum px-[15px] pt-[6px] pb-[6px] text-white text-xsss rounded-full">
                  {city}
                </p>
                <ButtonDefault
                  onClick={() => {
                    handleSubmit();
                  }}
                  text={`${!offLocError ? "Submit" : "Retry saving location"}`}
                  classes={{
                    root: "ml-auto !py-[6px] !px-[12px] !h-auto text-xs1 !bg-tailblack !rounded-[20px] !font-robto !font-smeibold",
                  }}
                />
              </>
            )}
          </>
        </div>
        {offLocLoading && (
          <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        )}
        {offLocError && (
          <AlertError color={"red"}>
            <div className="flex items-center">
              <p>{offLocError}</p>
            </div>
          </AlertError>
        )}
      </ModalMaintin>}
    </>
  );
}

export default MapModal;
