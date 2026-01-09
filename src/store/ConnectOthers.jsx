const initialState = {
  status: null,
  stLoading: null,
  srError: null,
};

export default function connectOthersReducer(state = initialState, action) {
  switch (action.type) {
    case "CONNECTION_STATRT": {
      return { ...state, stLoading: true };
    }
    case "CONNECTION_SUCCESS": {
      return { ...state, status: action.payload,stLoading:false,stError:null };
    }
    case "CONNECTION_FAILED": {
      return { ...state, stError: action.payload };
    }

    default: {
      return state;
    }
  }
}

export function fetchConnection() {
  return async (dispatch) => {
    try {
      dispatch({ type: "CONNECTION_STATRT" });
      const res = await fetch(
        "https://api.jsonbin.io/v3/b/69614107d0ea881f406016a6",
        {
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key":
              "$2a$10$eb5fMMQQKy3XfIbmNVHyme7iRC0x6iF6vv7XxuLVMJKiEQaMJ4qBi",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to Connect");
      const data = await res.json();
      dispatch({ type: "CONNECTION_SUCCESS", payload: data });
    } catch (error) {
      let errorMessage = "Something went Wrong";
      if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = "UnExpected Error";
      }
      dispatch({ type: "CONNECTION_FAILED", payload: errorMessage });
    }
  };
}
