import { Toaster } from "react-hot-toast";
import HomeLayouts from "../components/Layouts/HomeLayouts";
import MainLayouts from "../components/Layouts/MainLayouts";

const Home = () => {
  return (
    <>
      <Toaster position="top-center" />
      <MainLayouts>
        <HomeLayouts />
      </MainLayouts>
    </>
  );
};

export default Home;
