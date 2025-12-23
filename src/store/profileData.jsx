import { act } from "react";

const initialState = {
  profileData:{},
  uploading: null,
  errorUpload: null,
};
export default function profileDataReducer(state = initialState, action) {
  switch (action.type) {
    case "startUpload": {
     
      return { ...state, uploading: action.payload };
    }
    case 'fetchProfileData':{

      const data = !action.payload.error ? action.payload.resProfileData:{...state.profileData}
     
      return {...state,errorUpload:action.payload.error,profileData:data}
    }
  
    default: {
      return state;
    }
  }
}

export function postImageLink(name,job, fileObject, presetName) {
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
      
      if(!res.ok) throw new Error ('Image upload failed')
      const dataImage = await res.json();
      const image = dataImage?.secure_url||''
      
      //post profile data 
     const postProfileData =await fetch('https://api.jsonbin.io/v3/b',{
       "method":"POST",
        headers:{
            "Content-Type":"application/json",
            "X-Master-Key":"$2a$10$eb5fMMQQKy3XfIbmNVHyme7iRC0x6iF6vv7XxuLVMJKiEQaMJ4qBi",
        },
       "body":JSON.stringify({name:name,job:job,imgLink:image})
     })
     if(!postProfileData.ok) throw new Error('Failed to fetch ')
     const resData =await postProfileData.json()
     dispatch({type:'fetchProfileData',payload:{resProfileData:resData?.record,error:false}})

    } catch (error) {
      dispatch({ type: "fetchProfileData", payload:{ resProfileData:null,error:error.message} });
    } finally {
     dispatch({
        type: "startUpload",
        payload: false,
      });
    
    }
  };
}




