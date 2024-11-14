import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGetAllUsersQuery } from "../Features/LandingPage/UserSlice";
import { fullUserType } from "../Types/LandingTypes";
import { TiDeleteOutline } from "react-icons/ti";

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

  const handleDeleteFavorite = (fav: string) => {};

  const handleDisconnect = () => {
    let disconnect: boolean = window.confirm(
      "Do you really want to disconnect?"
    );
    if (disconnect) {
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
    <main className="user-background">
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
            <div className="box d1"></div>
            <div className="box d2"></div>
            <div className="box d3"></div>
            <div className="box d4"></div>
            <div className="box d5"></div>
            <div className="box d6"></div>
            <div className="box d7"></div>
          </div>
        ) : (
          <div className="light-colors">
            <div className="box l1"></div>
            <div className="box l2"></div>
            <div className="box l3"></div>
            <div className="box l4"></div>
            <div className="box l5"></div>
            <div className="box l6"></div>
            <div className="box l7"></div>
          </div>
        )}
      </div>
      <div className="favorite-list-container">
        <h2>Manage Your Favorites</h2>
        <ul>
          {currentUser?.options?.favorites &&
            currentUser.options.favorites.map((fav) => (
              <li>
                <>
                  {fav.name}{" "}
                  <TiDeleteOutline
                    onClick={() => handleDeleteFavorite(fav.name)}
                  />
                </>
              </li>
            ))}
        </ul>
      </div>
      <button onClick={() => handleDisconnect()}>disconnect</button>
    </main>
  );
};

export default Parameters;
