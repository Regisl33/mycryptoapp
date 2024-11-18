import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  useGetAllUsersQuery,
  useColorMutation,
} from "../Features/LandingPage/UserSlice";
import { colorMutation, fullUserType } from "../Types/LandingTypes";
import { TiDeleteOutline } from "react-icons/ti";
import Header from "./Header";
import Footer from "./Footer";

type propsType = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentID: React.Dispatch<React.SetStateAction<number | undefined>>;
  currentID: number | undefined;
};

const Parameters = ({ setIsLoggedIn, setCurrentID, currentID }: propsType) => {
  const { data: userApiData, isError, error } = useGetAllUsersQuery("User");
  const [currentUser, setCurrentUser] = useState<fullUserType>();
  const [darkTheme, setDarkTheme] = useState(false);
  const navigate = useNavigate();
  const [colorMutation] = useColorMutation();

  const handleDeleteFavorite = (fav: string) => {};

  const handleColorSwitch = async (color: string) => {
    if (currentID) {
      let newColor: colorMutation = {
        options: {
          options: {
            color,
          },
        },
        id: currentID,
      };

      try {
        await colorMutation(newColor).unwrap();
      } catch (err) {
        console.log(err);
      }
    }
  };

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
      if (userApiData?.ids) {
        userApiData.ids.map((id) =>
          id === currentID
            ? setCurrentUser(userApiData.entities[id])
            : console.log(id)
        );
      } else {
        console.log("There is no data in the user Array");
      }
    } else {
      console.log(error);
    }
  }, []);

  return (
    <main
      className={
        currentUser?.options?.color ? currentUser.options.color : "Lcolor1"
      }
    >
      <Header user={currentUser} />
      <div className="main-container">
        <div className="theme-container">
          <label htmlFor="dark-mode-checkbox">Toggle Dark Theme</label>
          <input
            type="checkbox"
            id="dark-mode-checkbox"
            checked={darkTheme ? true : false}
            onChange={() => setDarkTheme(!darkTheme)}
          />
        </div>
        <div className="background-selector">
          {darkTheme ? (
            <div className="dark-colors">
              <div
                className="Dbox Dcolor1"
                id="Dcolor1"
                onClick={() => handleColorSwitch("Dcolor1")}
              ></div>
              <div
                className="Dbox Dcolor2"
                id="Dcolor2"
                onClick={() => handleColorSwitch("Dcolor2")}
              ></div>
              <div
                className="Dbox Dcolor3"
                id="Dcolor3"
                onClick={() => handleColorSwitch("Dcolor3")}
              ></div>
              <div
                className="Dbox Dcolor4"
                id="Dcolor4"
                onClick={() => handleColorSwitch("Dcolor4")}
              ></div>
              <div
                className="Dbox Dcolor5"
                id="Dcolor5"
                onClick={() => handleColorSwitch("Dcolor5")}
              ></div>
              <div
                className="Dbox Dcolor6"
                id="Dcolor6"
                onClick={() => handleColorSwitch("Dcolor6")}
              ></div>
              <div
                className="Dbox Dcolor7"
                id="Dcolor7"
                onClick={() => handleColorSwitch("Dcolor7")}
              ></div>
            </div>
          ) : (
            <div className="light-colors">
              <div
                className="Lbox Lcolor1"
                id="Lcolor1"
                onClick={() => handleColorSwitch("Lcolor1")}
              ></div>
              <div
                className="Lbox Lcolor2"
                id="Lcolor2"
                onClick={() => handleColorSwitch("Lcolor2")}
              ></div>
              <div
                className="Lbox Lcolor3"
                id="Lcolor3"
                onClick={() => handleColorSwitch("Lcolor3")}
              ></div>
              <div
                className="Lbox Lcolor4"
                id="Lcolor4"
                onClick={() => handleColorSwitch("Lcolor4")}
              ></div>
              <div
                className="Lbox Lcolor5"
                id="Lcolor5"
                onClick={() => handleColorSwitch("Lcolor5")}
              ></div>
              <div
                className="Lbox Lcolor6"
                id="Lcolor6"
                onClick={() => handleColorSwitch("Lcolor6")}
              ></div>
              <div
                className="Lbox Lcolor7"
                id="Lcolor7"
                onClick={() => handleColorSwitch("Lcolor7")}
              ></div>
            </div>
          )}
        </div>
        <div className="favorite-list-container">
          <h2 className="title">Manage Your Favorites</h2>
          <ul>
            {currentUser?.options?.favorites ? (
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
            )}
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
