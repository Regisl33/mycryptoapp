import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
type propsType = {
  currentID: number;
  tempColor: string;
};

const LoggedInLayout = ({ currentID, tempColor }: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);

  const loggedInStructure = (
    <div
      className={
        tempColor.length > 0 && tempColor !== userData?.color
          ? tempColor
          : userData?.color
      }
    >
      <Header currentID={currentID} tempColor={tempColor} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
  return loggedInStructure;
};

export default LoggedInLayout;
