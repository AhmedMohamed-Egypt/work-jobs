import { NavLink } from "react-router-dom";
import profile from "../assets/profile.png";
import styles from "./tabs.module.css";
function HeaderTabs() {
  return (
    <div className={`flex items-center  ${styles.tabs}`}>
      <div>
        <NavLink
          to=""
          className="flex items-center justify-center w-[45px] h-[45px] rounded-full border-[.5px] border-grey200"
        >
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.40887 25.3708C5.98575 25.3708 4.83203 24.1869 4.83203 22.7251V12.0916C4.83203 11.2882 5.18842 10.5271 5.7985 10.0258L12.8863 4.20521C13.3392 3.8302 13.9087 3.625 14.4967 3.625C15.0847 3.625 15.6542 3.8302 16.1071 4.20521L23.1937 10.0258C23.805 10.5271 24.1613 11.2882 24.1613 12.0916V22.7251C24.1613 24.1869 23.0076 25.3708 21.5845 25.3708H7.40887Z"
              stroke="black"
              strokeWidth="2.00365"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.4766 25.3692V18.7248C11.4766 18.084 11.7311 17.4694 12.1842 17.0163C12.6374 16.5632 13.2519 16.3086 13.8927 16.3086H15.1008C15.7416 16.3086 16.3562 16.5632 16.8093 17.0163C17.2624 17.4694 17.517 18.084 17.517 18.7248V25.3692"
              stroke="black"
              strokeWidth="2.00365"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NavLink>
        <p className="text-center text-black font-inter font-normal text-xsss">
          Home
        </p>
      </div>
      <div>
        <NavLink
          to=""
          className="flex items-center justify-center w-[45px] h-[45px] rounded-full border-[.5px] border-grey200"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.30566 23.4609C5.75566 23.4609 5.285 23.2653 4.89366 22.8739C4.50233 22.4826 4.30633 22.0116 4.30566 21.4609V10.4609C4.30566 9.91094 4.50166 9.44027 4.89366 9.04894C5.28566 8.6576 5.75633 8.4616 6.30566 8.46094H10.3057V6.46094C10.3057 5.91094 10.5017 5.44027 10.8937 5.04894C11.2857 4.6576 11.7563 4.4616 12.3057 4.46094H16.3057C16.8557 4.46094 17.3267 4.65694 17.7187 5.04894C18.1107 5.44094 18.3063 5.9116 18.3057 6.46094V8.46094H22.3057C22.8557 8.46094 23.3267 8.65694 23.7187 9.04894C24.1107 9.44094 24.3063 9.9116 24.3057 10.4609V21.4609C24.3057 22.0109 24.11 22.4819 23.7187 22.8739C23.3273 23.2659 22.8563 23.4616 22.3057 23.4609H6.30566ZM12.3057 8.46094H16.3057V6.46094H12.3057V8.46094Z"
              fill="black"
            />
          </svg>
        </NavLink>
        <p className="text-center text-black font-inter font-normal text-xsss">
          Jobs
        </p>
      </div>
      <div>
        <NavLink
          to=""
          className="flex items-center justify-center w-[45px] h-[45px] rounded-full border-[.5px] border-grey200"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3388_1572)">
              <path
                d="M23.0494 9.6322C22.8814 11.9641 21.1515 13.7605 19.2651 13.7605C17.3787 13.7605 15.646 11.9647 15.4808 9.6322C15.3088 7.20625 16.9928 5.50391 19.2651 5.50391C21.5374 5.50391 23.2214 7.2504 23.0494 9.6322Z"
                stroke="black"
                strokeWidth="1.89398"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.2651 17.4297C15.5285 17.4297 11.9351 19.2857 11.0349 22.9002C10.9157 23.3784 11.2155 23.8515 11.7069 23.8515H26.8239C27.3153 23.8515 27.6135 23.3784 27.4959 22.9002C26.5957 19.2278 23.0024 17.4297 19.2651 17.4297Z"
                stroke="black"
                strokeWidth="1.89398"
                strokeMiterlimit="10"
              />
              <path
                d="M11.4671 10.662C11.333 12.5243 9.93509 13.991 8.42827 13.991C6.92144 13.991 5.52127 12.5249 5.38939 10.662C5.25235 8.72454 6.61297 7.33984 8.42827 7.33984C10.2436 7.33984 11.6042 8.76009 11.4671 10.662Z"
                stroke="black"
                strokeWidth="1.89398"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.8112 17.5471C10.7763 17.073 9.63644 16.8906 8.42834 16.8906C5.4468 16.8906 2.5742 18.3728 1.85461 21.2597C1.76001 21.6416 1.99968 22.0195 2.39186 22.0195H8.8297"
                stroke="black"
                strokeWidth="1.89398"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3388_1572">
                <rect width="29.3567" height="29.3567" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </NavLink>
        <p className="text-center text-black font-inter font-normal text-xsss">
          Network
        </p>
      </div>
      <div>
        <NavLink
          to=""
          className="flex items-center justify-center w-[45px] h-[45px] rounded-full border-[.5px] border-grey200"
        >
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0182 11.2692H20.0365M10.0182 16.2783H17.5319M22.541 5.00781C23.5374 5.00781 24.493 5.40362 25.1975 6.10817C25.9021 6.81271 26.2979 7.76828 26.2979 8.76465V18.7829C26.2979 19.7793 25.9021 20.7348 25.1975 21.4394C24.493 22.1439 23.5374 22.5397 22.541 22.5397H16.2796L10.0182 26.2966V22.5397H7.51368C6.5173 22.5397 5.56173 22.1439 4.85719 21.4394C4.15264 20.7348 3.75684 19.7793 3.75684 18.7829V8.76465C3.75684 7.76828 4.15264 6.81271 4.85719 6.10817C5.56173 5.40362 6.5173 5.00781 7.51368 5.00781H22.541Z"
              stroke="black"
              strokeWidth="2.07695"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NavLink>
        <p className="text-center text-black font-inter font-normal text-xsss">
          Messages
        </p>
      </div>

      <div>
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={profile}
          alt="profile"
        />
        <h3 className="text-black font-inter font-bold text-xsss">Profile</h3>
      </div>
    </div>
  );
}

export default HeaderTabs;
