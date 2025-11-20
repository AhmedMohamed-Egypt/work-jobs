import { SearchInput } from "../UiCompoents/SearchInput"
import HeaderTabs from "./HeaderTabs"
import styles from './searchInput.module.css'

function Header() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className="mr-[50px] font-inter w-[50px] h-[50px] font-bold text-base bg-black rounded-full text-white flex items-center justify-center">
                HW
            </div>
            <div>
                <SearchInput classes={{input:'!rounded-[8px] !border-grey100 !min-h-auto !py-[22px] !pr-[190px] placeholder:!text-tailgrid !bg-grey50 paddingInlineEnd:0 mx-w-auto placeholder:font-inter placeholder:font-medium placeholder:text-xss',section:`${styles.mantinesection}`}} text="Search for professional"/>
            </div>
            </div>
            <div>
                <HeaderTabs/>
            </div>
        </div>
    )
}

export default Header
