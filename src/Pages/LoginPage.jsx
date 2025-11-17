import { useState } from "react";
import logoAvatr from "../assets/login-avatar.png";
import ButtonDefault from "../UiCompoents/Button";
import CheckBoxInput from "../UiCompoents/CheckBoxInput";
import {InputTooltip} from '../UiCompoents/InputEmailPassword'
import { UseEmailPassword } from "../context/EmailPasswordContext";
function LoginPage() {
  const [val,setVal] = useState('')
  const [valPass,setValPass] = useState('')
  const {getvals} = UseEmailPassword()
  const [error,setError] = useState('fwwfwfw')
  const handleClick = ()=>{
      if(!val || !valPass) return;
      getvals({email:val,password:valPass})
  }
  return (
   <div className="bg-gray-100">
     <div className="container mx-auto max-w-full 2xl:max-w-fit bg-gray-0">
      <div className="flex items-center h-screen">
        <div className="h-full 2xl:h-auto">
          <img className="h-full" src={logoAvatr} alt="" />
        </div>
        <div className="flex-1 px-30 2xl:w-3xl">
            <h3 className="mb-[50px] font-manpore font-extrabold text-lg">Sign in</h3>
            <InputTooltip errorEmail={error} pass={valPass} onChangePass={(e)=>setValPass(e.target.value)} email={val} onChangeEmail={(e)=>setVal(e.target.value)}  />
           <div className="mt-[25px] flex items-center justify-between">
             <CheckBoxInput />
             <a href="#" className="underline font-grotesk font-normal text-xs">Forgort your password</a>
           </div>
           <div className="mt-[25px]">
            <ButtonDefault  onClick={handleClick} text="log in" classes={{root:'!rounded-[6px] !bg-black !w-full  !h-auto min-h-auto',inner:'track leading-normal !h-auto font-grotesk font-normal text-xs1  py-5'}}/>
           <ButtonDefault  text="Register" classes={{root:'mt-5 !rounded-[6px] !bg-transparent !text-black !border-black !w-full  !h-auto min-h-auto',inner:'track leading-normal !h-auto font-grotesk font-normal text-xs1  py-5'}}/>

           </div>

        </div>
      </div>
    </div>
   </div>
  );
}

export default LoginPage;
