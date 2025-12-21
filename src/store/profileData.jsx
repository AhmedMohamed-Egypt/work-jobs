import { act } from "react";

const initialState = {
  name: "",
  jobTitle: "",
  imgLink: null,
  uploading: null,
  errorUpload: null,
};
export default function profileDataReducer(state = initialState, action) {
  switch (action.type) {
    case "startUpload": {
     
      return { ...state, uploading: action.payload };
    }
    case "setImage": {  

      const profName = action.payload.name
      const profJobTilte = action.payload.jobTitle
      const linkImage = action.payload.image.secure_url
      const error = action.payload.error
    
      return { ...state,name:profName,jobTitle:profJobTilte,imgLink:linkImage,errorUpload:error};
    }

    default: {
      return state;
    }
  }
}

export function getprofileData( data,fileObject, presetName) {
  return async (dispatch, getState) => {
   
    try {
      dispatch({
        type: "startUpload",
        payload: true,
      });
      const formData = new FormData();
      formData.append("file", fileObject);
      formData.append("upload_preset", presetName);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/defi-system/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      //send erorr to catch 
      if(!fileObject) throw new Error('No File Selected')
      if(!res.ok) throw new Error ('Something Wrong')
      const dataImage = await res.json();
      dispatch({ type: "setImage", payload: {...data, image:dataImage,error:false} });
    } catch (error) {
      dispatch({ type: "setImage", payload:{ image:null,error:error.message} });
    } finally {
     dispatch({
        type: "startUpload",
        payload: false,
      });
    }
  };
}
