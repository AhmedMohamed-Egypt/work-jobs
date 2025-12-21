import { useEffect, useState } from "react";

function getProfileData() {
  const [profileData, setProfileData] = useState({});
  const [lodadingData, setLoadingData] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        /*https://api.jsonbin.io/v3/b/6936b906d0ea881f401a8a4e*/
        "https://dummyjson.com/test522",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key":
              "$2a$10$eb5fMMQQKy3XfIbmNVHyme7iRC0x6iF6vv7XxuLVMJKiEQaMJ4qBi",
            "X-Access-Key":
              "$2a$10$Ns9qOS.CQwU3lhmc.bVXLeslYRJmp2UePm4rbXE3Cccb8Tdmp.GbC",
          },
        }
      );
      if (data.ok) {
        const res = await data.json();
        setLoadingData(false);
        setProfileData(res);
      }
    }
    fetchData();
  }, []);
  return { profileData, lodadingData };
}
export { getProfileData };
