import ButtonDefault from "./Button"

function CreateJobs() {
    return (
        <div className="pl-5 bg-white border border-[#E0DFDC] p-4 py-5 pb-8 my-8 rounded-xl">
            <h3 className="text-[20px] font-roboto! !font-medium mb-3">Jobs</h3>
            <div>
                <ButtonDefault classes={{root:'!px-6 !h-auto !bg-[#000] !font-roboto !rounded-full !font-normal' ,label:'!text-white !py-[7px]  !text-base'}} text={'Create New Jobs'}/>
                 <ButtonDefault classes={{root:'!ml-2 !bg-[#fff] border !border-[#000] !rounded-full',label:'!text-black'}} text={'View Your Jobs'}/>
                
            </div>
        </div>
    )
}

export default CreateJobs
