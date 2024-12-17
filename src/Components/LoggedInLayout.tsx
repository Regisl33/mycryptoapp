//Import Dependencies
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
//Import Custom Hook
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
//Import the Header and Footer Components
import Header from "./Header";
import Footer from "./Footer";
//Import Custom Type
import { IDColorPropsType } from "../Types/AppTypes";

const LoggedInLayout = ({ currentID, tempColor }: IDColorPropsType) => {
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);
  //Full Structure of a logged In Page
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
