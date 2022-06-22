import type { NextPage } from "next";
import { Profiles } from "../features/profile/profiles";
import { Logo } from "../components/logo";

const Home: NextPage = () => {
  return (
    <div>
      <Logo />
      <Profiles />
    </div>
  );
};

export default Home;
