import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import Header from "./Header";
import Footer from "./Footer";
import ThemeSelector from "./ThemeSelector";
import ParamFavorite from "./ParamFavorite";

type propsType = {
  tempColor: string;
  setTempColor: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentID: React.Dispatch<React.SetStateAction<number | undefined>>;
  currentID: number | undefined;
};

const Parameters = ({
  setIsLoggedIn,
  setCurrentID,
  currentID,
  tempColor,
  setTempColor,
}: propsType) => {
  const {
    data: userData,
    isError,
    error,
  } = useGetCurrentUserQuery(currentID as number);

  const navigate = useNavigate();

  const handleDisconnect = () => {
    let disconnect: boolean = window.confirm(
      "Do you really want to disconnect?"
    );
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

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, []);

  return (
    <main
      className={
        tempColor.length > 0 && tempColor !== userData?.color
          ? tempColor
          : userData?.color
      }
    >
      <Header currentID={currentID as number} />
      <div className="main-container">
        <ThemeSelector
          currentID={currentID as number}
          tempColor={tempColor}
          setTempColor={setTempColor}
        />
        <ParamFavorite currentID={currentID as number} />

        <button className="Lbtn" onClick={() => handleDisconnect()}>
          disconnect
        </button>
      </div>
      <Footer />
    </main>
  );
};

export default Parameters;
