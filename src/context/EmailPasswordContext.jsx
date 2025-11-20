//creat context

import { createContext, useContext, useReducer } from "react";

const EmailPasswordContext = createContext()

const initialState = {
   credintials:{}
}

function reducer(snState,action){
    switch(action.type){
        case 'getData':{
            
       return {...snState,credintials:{email:action.payload.email,password:action.payload.password}}
        }
        default:{
            throw new Error('Action not known')
        }
    }
}

function EmailPasswordProvider({children}){
    const [{credintials},dispatch] = useReducer(reducer,initialState)
    function getvals(value){
    dispatch({type:'getData',payload:value})
}
    return <EmailPasswordContext.Provider value={{getvals,credintials}}>{children}</EmailPasswordContext.Provider>
}



function UseEmailPassword(){
    const context = useContext(EmailPasswordContext)
    if(context===undefined)
         throw new Error('Context used outside')
        return context
}

export{EmailPasswordProvider,UseEmailPassword}