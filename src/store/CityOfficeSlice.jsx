//OFFICE_LOCATION
//officeLocation,officeLocation,offLocError
const initialState = {
  officeLocation: null,
  offLocLoading: null,
  offLocError: null,
  completed:null
};
export default function cityOffice(state = initialState, action) {
  switch (action.type) {
    case "FETCH_LOCATION_START": {
      return { ...state, offLocLoading: true, offLocError: null };
    }
    case "FETCH_LOCATION_SUCCESS": {
      return {
        ...state,
        officeLocation: action.payload?.record?.cityName,
        offLocError: null,
        offLocLoading: false,
        completed:true
      };
    }
    case "FETCH_LOCATION_ERROR": {
      return { ...state, offLocError: action.payload, offLocLoading: false };
    }
    case "CLEAR_ERROR":{
      
      return {...state,offLocError:null}
    }
    case 'RESET':{
      return {initialState}
    }
    default:
      return state;
  }
}

export function fetchCityLocation(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_LOCATION_START" });
      const res = await fetch("https://api.jsonbin.io/v3/b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key":
            "$2a$10$eb5fMMQQKy3XfIbmNVHyme7iRC0x6iF6vv7XxuLVMJKiEQaMJ4qBi",
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new TypeError("Failed to save city location");
      const dataLocation = await res.json();
      dispatch({ type: "FETCH_LOCATION_SUCCESS", payload: dataLocation });
    } catch (error) {
      let errorMessage = "Something went wrong";

      // 🌐 No internet / network error

      if (!navigator.onLine ) {
        errorMessage = "No internet connection. Please check your network.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = "Unexpected error occurred. Please try again.";
      }

      dispatch({
        type: "FETCH_LOCATION_ERROR",
        payload: errorMessage,
      });
    }
  };
}
export function clearError(){
  return {type:'CLEAR_ERROR'}
}
export function resetCompletion(){
  return {type:'RESET'}
}