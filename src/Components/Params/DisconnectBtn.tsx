//Import Dependencies
import { useEffect } from "react";
import { useNavigate } from "react-router";
//Import Custom Hook
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
//Props Type for UserID, Temp Color, and the Setters for needReload and isLoggedIn
type propsType = {
  currentID: number | undefined;
  tempColor: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentID: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const DisconnectBtn = ({
  currentID,
  tempColor,
  setCurrentID,
  setIsLoggedIn,
}: propsType) => {
  //Get Current User Data
  const {
    data: userData,
    isError,
    error,
  } = useGetCurrentUserQuery(currentID as number);
  //Define Navigate
  const navigate = useNavigate();
  //This Function Handle the Disconnection of a User
  const handleDisconnect = () => {
    //Make Sure the User Confirm he Wants to Disconnect
    let disconnect: boolean = window.confirm(
      "Do you really want to disconnect?"
    );
    //If so Clear the Storage and Return to Login
    if (disconnect) {
      if (localStorage.selectedID) {
        localStorage.removeItem("selectedID");
      }
      sessionStorage.clear();
      setCurrentID(undefined);
      navigate("/login");
      setIsLoggedIn(false);
    }
  };
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //Disconnect Button with Appropriate Shadow
  const DiscButton = (
    <button
      className={
        tempColor.length > 0
          ? tempColor[0] === "D"
            ? `${tempColor}-btn Dbtn logout-btn`
            : `${tempColor}-btn Lbtn logout-btn`
          : userData?.color[0] === "D"
          ? `${userData?.color}-btn Dbtn logout-btn`
          : `${userData?.color}-btn Lbtn logout-btn`
      }
      onClick={() => handleDisconnect()}
    >
      disconnect
    </button>
  );

  return DiscButton;
};

export default DisconnectBtn;
