import Header from "../components/Header";
import { Container } from "@mantine/core";
import { UseEmailPassword } from "../context/EmailPasswordContext";
import ProfileInfo from "../components/ProfileInfo";
import ProfileContents from "../components/ProfileContents";

function HomePage() {
  return (
    <>
      <div className="container mx-auto pt-4">
        <Header />
      </div>
      <div className="bg-grey250  border-t border-grey200 pt-3">
        <div className="container mx-auto pt-4 flex items-start justify-between">
          <ProfileInfo />
          <ProfileContents/>
        </div>
      </div>
    </>
  );
}

export default HomePage;
