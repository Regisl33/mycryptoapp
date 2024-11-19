import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { TiDeleteOutline } from "react-icons/ti";
import Header from "./Header";
import Footer from "./Footer";
import ThemeSelector from "./ThemeSelector";

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

  const handleDeleteFavorite = (fav: string) => {};

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
    if (!isError) {
      console.log(error);
    }
  }, []);

  return (
    <main
      className={
        tempColor.length > 0 && tempColor !== userData?.options.color
          ? tempColor
          : userData?.options.color
      }
    >
      <Header />
      <div className="main-container">
        <ThemeSelector
          currentID={currentID as number}
          tempColor={tempColor}
          setTempColor={setTempColor}
        />

        <div className="favorite-list-container">
          <h2 className="title">Manage Your Favorites</h2>
          <ul>
            {/* {currentUser?.options?.favorites ? (
              currentUser.options.favorites.map((fav) => (
                <li>
                  <>
                    {fav.name}{" "}
                    <TiDeleteOutline
                      onClick={() => handleDeleteFavorite(fav.name)}
                    />
                  </>
                </li>
              ))
            ) : (
              <p> You don't have any favorite coin</p>
            )} */}
          </ul>
        </div>
        <button className="Lbtn" onClick={() => handleDisconnect()}>
          disconnect
        </button>
      </div>
      <Footer />
    </main>
  );
};

export default Parameters;
