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
    } else {
      console.log("cancel disconnect");
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
      <div className="color-picker"></div>
      <div className="theme-container">
        <label htmlFor="dark-mode-checkbox">Toggle Dark Theme</label>
        <input type="checkbox" id="dark-mode-checkbox" />
      </div>
      <div className="favorite-list-container">
        <h2>Manage Your Favorites</h2>
        <ul>
          {currentUser?.options?.favorites &&
            currentUser.options.favorites.map((fav) => (
              <li>
                {fav}{" "}
                <TiDeleteOutline onClick={() => handleDeleteFavorite(fav)} />
              </li>
            ))}
        </ul>
      </div>
      <button onClick={() => handleDisconnect()}>disconnect</button>
    </main>
  );
};

export default Parameters;
