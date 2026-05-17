import { useState } from "react";

const initialState = {
  listPersons: [],
  stLoading: null,
  stError: null,
  listFailes:[]
  
};

export default function connectOthersReducer(state = initialState, action) {
  switch (action.type) {
    case "CONNECTION_STATRT": {
      return { ...state, stLoading: true };
    }
    case "CONNECTION_SUCCESS": {
      
      const id = action.payload.id;
     const exists = state.listPersons.includes(id);
      return {
        ...state,
         listPersons: exists
      ? state.listPersons
      : [...state.listPersons, id],
        stLoading: false,
      };
    }
    case "CONNECTION_FAILED": {
      
      const id = action.payload.id
      const exist = state.listFailes.includes(id)
      
      return {
        ...state,
        listFailes:exist?state.listFailes:[...state.listFailes,id],
        stError: action.payload.error,
        stLoading: false,
       
      };
    }

    default: {
      return state;
    }
  }
}

export function fetchConnection(id) {
  return async (dispatch,getstate) => {
  const exist = getstate().connectOthers.listPersons 
  //const existFailed =getstate().connectOthers.listFailes 
  if(exist.includes(id)) return ;
    try {
      dispatch({ type: "CONNECTION_STATRT" });
      const res = await fetch(
        "https://api.jsonbin.io/v3/b/696482e043b1c97be92a501b",
        {
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key":
              "$2a$10$eb5fMMQQKy3XfIbmNVHyme7iRC0x6iF6vv7XxuLVMJKiEQaMJ4qBi",
          },
        },
      );
      if (!res.ok) throw new Error("Failed to Connect");
      const data = await res.json();

      dispatch({
        type: "CONNECTION_SUCCESS",
        payload: { dataId: data.record, id: id },
      });
    } catch (error) {
      let errorMessage = "Something went Wrong";
      if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = "UnExpected Error";
      }
      dispatch({
        type: "CONNECTION_FAILED",
        payload: { error: errorMessage, id: id },
      });
    }
  };
}
