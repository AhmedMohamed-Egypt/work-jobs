//creat context

import { createContext, useContext, useReducer } from "react";

const EmailPasswordContext = createContext()

const initialState = {}

function reducer(snState,action){
    switch(action.type){
        case 'getData':{
            console.log(action.payload)
       return {...snState}
        }
        default:{
            throw new Error('Action not known')
        }
    }
}

function EmailPasswordProvider({children}){
    const [{},dispatch] = useReducer(reducer,initialState)
    function getvals(value){
    dispatch({type:'getData',payload:value})
}
    return <EmailPasswordContext.Provider value={{getvals}}>{children}</EmailPasswordContext.Provider>
}



function UseEmailPassword(){
    const context = useContext(EmailPasswordContext)
    if(context===undefined)
         throw new Error('Context used outside')
        return context
}

export{EmailPasswordProvider,UseEmailPassword}