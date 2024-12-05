import { useCallback, useEffect, useState } from "react";
import { coinDataType } from "../Types/AppTypes";
import { useNavigate } from "react-router";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { getCurrentUserFavorite } from "../Features/CoinGeeckoData/CoinDataSlice";
import { useFavoriteMutation } from "../Features/LandingPage/UserSlice";
import { favoriteMutationType } from "../Types/LandingTypes";
import { useAppSelector } from "../Store/Store";

type propsType = {
  coin: coinDataType;
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const IndividualSearchCoin = ({
  coin,
  currentID,
  tempColor,
  tempFavArray,
  setTempFavArray,
}: propsType) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const navigate = useNavigate();
  const [favoriteMutation] = useFavoriteMutation();

  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );

  const handleAddDelete = (unique: boolean, favArray: string[]) => {
    if (userData) {
      if (unique) {
        let newFav: favoriteMutationType = {
          user: {
            favorites: [coin.id, ...favArray],
          },
          id: userData.id,
        };
        try {
          let newArray = getCurrentUserFavorite(favArray, coinData);
          setTempFavArray([coin, ...newArray]);
          favoriteMutation(newFav).unwrap();
        } catch (err) {
          console.log(err);
        }
      } else {
        let newArray = favArray.filter((fav) => fav !== coin.id);
        let newFav: favoriteMutationType = {
          user: {
            favorites: newArray,
          },
          id: userData.id,
        };
        try {
          let newFavArray = getCurrentUserFavorite(newArray, coinData);
          favoriteMutation(newFav).unwrap();
          if (newFavArray.length > 0) {
            setTempFavArray(newFavArray);
          } else {
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      console.log("Error no userData");
    }
  };

  const handleFavorite = () => {
    if (userData) {
      if (tempFavArray.length > 0) {
        let favoriteArray = [...tempFavArray];
        let isUnique = true;
        let favoriteID: string[] = [];
        favoriteArray.map((fav) => favoriteID.push(fav.id));
        favoriteArray.map((fav) =>
          fav.id === coin.id ? (isUnique = false) : null
        );
        handleAddDelete(isUnique, favoriteID);
      } else if (userData.favorites && userData.favorites.length > 0) {
        let favoriteArray = [...userData.favorites];
        let isUnique = true;
        favoriteArray.map((fav) =>
          fav === coin.id ? (isUnique = false) : null
        );
        handleAddDelete(isUnique, favoriteArray);
      } else {
        let newFav: favoriteMutationType = {
          user: {
            favorites: [coin.id],
          },
          id: userData.id,
        };
        try {
          setTempFavArray([coin]);
          favoriteMutation(newFav).unwrap();
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      console.log("Error no userData");
    }
  };

  const handleFavChange = () => {
    setIsFavorite(!isFavorite);
    handleFavorite();
  };

  const handleFavoriteDisplay = useCallback(() => {
    let isFav = false;
    if (tempFavArray.length > 0) {
      tempFavArray.map((fav) => (fav.id === coin.id ? (isFav = true) : null));
    } else if (userData?.favorites && userData.favorites.length > 0) {
      userData.favorites.map((fav) =>
        fav === coin.id ? (isFav = true) : null
      );
    }
    setIsFavorite(isFav);
  }, [userData, tempFavArray, coin]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    handleFavoriteDisplay();
  }, [handleFavoriteDisplay]);

  return (
    <div
      className={
        tempColor.length > 0
          ? tempColor[0] === "D"
            ? "Dcoin-result"
            : "Lcoin-result"
          : userData?.color[0] === "D"
          ? "Dcoin-result"
          : "Lcoin-result"
      }
    >
      <figure className="logo-container">
        <h2
          className={
            tempColor.length > 0
              ? tempColor[0] === "D"
                ? "Dshadow"
                : "Lshadow"
              : userData?.color[0] === "D"
              ? "Dshadow"
              : "Lshadow"
          }
          onClick={() => navigate(`/coin/:${coin.id}`)}
        >
          {coin.name}
        </h2>
        <img src={coin.image} alt={coin.name + "image"} />
        <figcaption>
          {coin.symbol.toUpperCase()}{" "}
          <span>
            {coin.price_change_percentage_24h_in_currency.toFixed(1) + "%"}
          </span>
        </figcaption>
      </figure>
      <div className="search-container">
        <div className="fav-container">
          {isFavorite ? (
            <label
              htmlFor="Fav-Input"
              className={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "Dshadow"
                    : "Lshadow"
                  : userData?.color[0] === "D"
                  ? "Dshadow"
                  : "Lshadow"
              }
            >
              Remove From Favorite
            </label>
          ) : (
            <label
              htmlFor="Fav-Input"
              className={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "Dshadow"
                    : "Lshadow"
                  : userData?.color[0] === "D"
                  ? "Dshadow"
                  : "Lshadow"
              }
            >
              Add To Favorite
            </label>
          )}
          <div className="checkbox-wrapper-50">
            <input
              type="checkbox"
              className="plus-minus"
              id="Fav-Input"
              checked={isFavorite}
              onClick={() => handleFavChange()}
            />
          </div>
        </div>
        <div className="coin-info-container">
          <table>
            <tbody>
              <tr>
                <th
                  className={
                    tempColor.length > 0
                      ? tempColor[0] === "D"
                        ? "Dshadow"
                        : "Lshadow"
                      : userData?.color[0] === "D"
                      ? "Dshadow"
                      : "Lshadow"
                  }
                >
                  Market Cap:
                </th>
                <td>
                  {coin.market_cap
                    ? (coin.market_cap / 1000000).toFixed(3) + "M $"
                    : "-"}
                </td>
                <th
                  className={
                    tempColor.length > 0
                      ? tempColor[0] === "D"
                        ? "Dshadow"
                        : "Lshadow"
                      : userData?.color[0] === "D"
                      ? "Dshadow"
                      : "Lshadow"
                  }
                >
                  Market Cap Rank:
                </th>
                <td>{coin.market_cap_rank}</td>
              </tr>
              <tr>
                <th
                  className={
                    tempColor.length > 0
                      ? tempColor[0] === "D"
                        ? "Dshadow"
                        : "Lshadow"
                      : userData?.color[0] === "D"
                      ? "Dshadow"
                      : "Lshadow"
                  }
                >
                  Price:
                </th>
                <td>{coin.current_price.toLocaleString() + "$"}</td>
                <th
                  className={
                    tempColor.length > 0
                      ? tempColor[0] === "D"
                        ? "Dshadow"
                        : "Lshadow"
                      : userData?.color[0] === "D"
                      ? "Dshadow"
                      : "Lshadow"
                  }
                >
                  Volume:
                </th>
                <td>
                  {coin.total_volume
                    ? (coin.total_volume / 1000000).toFixed(3) + "M $"
                    : "-"}
                </td>
              </tr>
              <tr>
                <th
                  className={
                    tempColor.length > 0
                      ? tempColor[0] === "D"
                        ? "Dshadow"
                        : "Lshadow"
                      : userData?.color[0] === "D"
                      ? "Dshadow"
                      : "Lshadow"
                  }
                >
                  Ath:
                </th>
                <td>{coin.ath_change_percentage.toFixed(1) + "%"}</td>
                <th
                  className={
                    tempColor.length > 0
                      ? tempColor[0] === "D"
                        ? "Dshadow"
                        : "Lshadow"
                      : userData?.color[0] === "D"
                      ? "Dshadow"
                      : "Lshadow"
                  }
                >
                  Ath Date:
                </th>
                <td>{coin.ath_date.slice(0, 10)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IndividualSearchCoin;
