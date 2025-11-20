import Header from "../components/Header";
import { Container } from "@mantine/core";
import { UseEmailPassword } from "../context/EmailPasswordContext";

function HomePage() {
  return (
    <div className="container mx-auto pt-4">
      <Header />
    </div>
  );
}

export default HomePage;
