import { act, use, useEffect, useState } from "react";
import { IMAGES } from "../constatnts/images";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnection } from "../store/ConnectOthers";
import AlertError from "./Alert";
const recommendations = [
  {
    id: 1,
    name: "Selam Tesfay",
    title: "Lead Instructor",
    avatar: IMAGES["imgFreeOne"],
    active: true,
  },
  {
    id: 2,
    name: "Mebrat Haile",
    title: "Nurse & Entrepreneur",
    avatar: IMAGES["imgFreeTwo"],
  },
  {
    id: 3,
    name: "Kibreab Meharii",
    title: "Junior Architect",
    avatar: IMAGES["imgFreeThree"],
  },
  {
    id: 4,
    name: "Samuel Fessehaye",
    title: "Business Analyst",
    avatar: IMAGES["img1"],
  },
  {
    id: 5,
    name: "Zerai Tewelde",
    title: "Mechanical Engineer",
    avatar: IMAGES["imgFreeFour"],
  },
];
export default function Recommendations() {
  const { listPersons,listFailes, stLoading, stError } = useSelector(
    (store) => store.connectOthers,
  );
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);
  const [btnList, setBtnList] = useState([]);
  const [text, setText] = useState("Connect");
  const dispatch = useDispatch();
  const handleConnect = (id) => {
    setActive(id);
    dispatch(fetchConnection(id));
  };
  const handleConnection = (id) => {
    if (listPersons.includes(id)) {
      return "Connected";
    } else {
      if (stLoading) return "Connecting";
      if (stError) return "Retry";
    }
  };

  return (
    <section className="rounded-xl border border-grey100 bg-white p-5 w-[500px]">
      <div
        className={`absolute top-0 right-0 transition-transform duration-500 ease-in-out
    ${visible ? "translate-x-0" : "translate-x-full"}
  `}
      >
        <AlertError color="red.9">
          <div className="flex items-center">
            <p className="pr-2">{stError}</p>
            <button
              onClick={() => setVisible(false)}
              className="cursor-pointer w-6 h-6 flex items-center justify-center rounded-full bg-red-700 text-white hover:bg-red-800 transition"
            >
              ✕
            </button>
          </div>
        </AlertError>
      </div>

      {/* Header */}
      <div className="mb-4 flex items-center justify-between w-[90%] mx-auto">
        <h3 className="text-xs1 font-inter font-semibold">Recommendations</h3>
        <button className="rounded-full cursor-pointer bg-black px-6 py-1 text-xs1  font-roboto text-white transition hover:opacity-90">
          Set Preference
        </button>
      </div>

      {/* List */}
      <div className="space-y-3 w-[90%] mx-auto">
        {recommendations.map((user, indx) => {
          return (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-lg border p-3 border-grey50"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`relative h-12 w-12 overflow-hidden rounded-full`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-medium font-inter text-xss">{user.name}</p>
                  <p className="text-xsss font-normal text-grey300">
                    {user.title}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleConnect(user.id)}
                className={`rounded-full  border-[1.2px] px-4 py-1  text-xsss font-normal font-inter transition cursor-pointer ${listPersons.includes(user.id)?'bg-green-500 text-white':(listFailes.includes(user.id)?'bg-red-500 text-white':'')}`}
              >
                {user.id === active
                  ? handleConnection(user.id)
                  : listPersons.includes(user.id)?'Connected': (listFailes.includes(user.id)?'Retry':'Connect')}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="w-[90%] mx-auto">
        <button className="cursor-pointer mt-4 flex font-inter  items-center gap-1 text-xs1 font-normal">
          View all
          <span className="inline-block ml-1">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.293 2.29279C8.48053 2.10532 8.73484 2 9 2C9.26516 2 9.51947 2.10532 9.707 2.29279L14.207 6.79279C14.3945 6.98031 14.4998 7.23462 14.4998 7.49979C14.4998 7.76495 14.3945 8.01926 14.207 8.20679L9.707 12.7068C9.5184 12.8889 9.2658 12.9897 9.0036 12.9875C8.7414 12.9852 8.49059 12.88 8.30518 12.6946C8.11977 12.5092 8.0146 12.2584 8.01233 11.9962C8.01005 11.734 8.11084 11.4814 8.293 11.2928L11 8.49979H1.5C1.23478 8.49979 0.98043 8.39443 0.792893 8.20689C0.605357 8.01936 0.5 7.765 0.5 7.49979C0.5 7.23457 0.605357 6.98022 0.792893 6.79268C0.98043 6.60514 1.23478 6.49979 1.5 6.49979H11L8.293 3.70679C8.10553 3.51926 8.00021 3.26495 8.00021 2.99979C8.00021 2.73462 8.10553 2.48031 8.293 2.29279Z"
                fill="black"
              />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}