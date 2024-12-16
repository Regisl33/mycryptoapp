import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
import Header from "../Header";
import Footer from "../Footer";
import ThemeSelector from "./ThemeSelector";
import ParamFavorite from "./ParamFavorite";
import { coinDataType } from "../../Types/AppTypes";
import { useColorMutation } from "../../Features/LandingPage/UserSlice";
import { colorMutation } from "../../Types/LandingTypes";

type propsType = {
  tempColor: string;
  setTempColor: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentID: React.Dispatch<React.SetStateAction<number | undefined>>;
  currentID: number | undefined;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const Parameters = ({
  setIsLoggedIn,
  setCurrentID,
  currentID,
  tempColor,
  setTempColor,
  tempFavArray,
  setTempFavArray,
}: propsType) => {
  const {
    data: userData,
    isError,
    error,
  } = useGetCurrentUserQuery(currentID as number);

  const [colorMutation] = useColorMutation();

  const handleColorSwitch = async (color: string) => {
    if (currentID) {
      let newColor: colorMutation = {
        user: {
          color,
        },
        id: currentID,
      };

      try {
        setTempColor(color);
        await colorMutation(newColor).unwrap();
      } catch (err) {
        console.log(err);
      }
    }
  };

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
  }, [isError, error]);

  return (
    <main
      className={
        tempColor.length > 0 && tempColor !== userData?.color
          ? tempColor
          : userData?.color
      }
    >
      <Header currentID={currentID as number} tempColor={tempColor} />
      <div className="main-container">
        <ThemeSelector
          currentID={currentID as number}
          tempColor={tempColor}
          setTempColor={setTempColor}
          handleColorSwitch={handleColorSwitch}
        />
        <ParamFavorite
          tempColor={tempColor}
          currentID={currentID as number}
          tempFavArray={tempFavArray}
          setTempFavArray={setTempFavArray}
        />

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
      </div>
      <Footer />
    </main>
  );
};

export default Parameters;
