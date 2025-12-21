import { useReducer, useEffect } from "react";

const initialState = {
  image: null,
  upload: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "startUpload":
      return { ...state, upload: action.payload };
    case "setImage":
      return { ...state, image: action.payload };
    default:
      return state;
  }
};

export function useUploadImage(fileObject, presetName) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!fileObject) return;

    const postImage = async () => {
      dispatch({ type: "startUpload", payload: true });

      const formData = new FormData();
      formData.append("file", fileObject);
      formData.append("upload_preset", presetName);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/defi-system/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        dispatch({ type: "setImage", payload: data });
      }

      dispatch({ type: "startUpload", payload: false });
    };

    postImage();
  }, [fileObject, presetName]);

  return {
    image: state.image,
    uploading: state.upload,
  };
}
