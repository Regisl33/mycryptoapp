import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../Store/Store";
import { coinDataType } from "../Types/AppTypes";
import { useParams } from "react-router";
import AreaChartComponent from "./AreaChartComponent";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import Header from "./Header";
import Footer from "./Footer";
import { useFavoriteMutation } from "../Features/LandingPage/UserSlice";
import { getCurrentUserFavorite } from "../Features/CoinGeeckoData/CoinDataSlice";
import { favoriteMutationType } from "../Types/LandingTypes";

type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const IndividualCoinData = ({
  currentID,
  tempColor,
  tempFavArray,
  setTempFavArray,
}: propsType) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );

  const [favoriteMutation] = useFavoriteMutation();

  const { coinID } = useParams<{ coinID: string }>();

  const filteredCoin = coinData.filter((coin) => coinID?.slice(1) === coin.id);

  const coin = filteredCoin[0];

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
  }, [tempFavArray, userData, coin]);

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
        tempColor.length > 0 && tempColor !== userData?.color
          ? tempColor
          : userData?.color
      }
    >
      <Header currentID={currentID} tempColor={tempColor} />
      {coin && (
        <div className="main-container">
          <div className="top-container">
            <div className="empty-container"></div>
            <div className="logo-container">
              <figure className="Coin-Name-Logo">
                <img src={coin.image} alt={coin.name} />
                <h2
                  className={
                    tempColor.length > 0
                      ? tempColor[0] === "D"
                        ? "title Dshadow"
                        : "title Lshadow"
                      : userData?.color[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                  }
                >
                  {coin.name}
                </h2>
                <figcaption>{`(${coin.symbol.toUpperCase()})`}</figcaption>
              </figure>
            </div>
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
          </div>

          <AreaChartComponent
            coinID={coin.id}
            tempColor={tempColor}
            currentID={currentID}
          />

          <p className="center">
            <span
              className={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                  : userData?.color[0] === "D"
                  ? "title Dshadow"
                  : "title Lshadow"
              }
            >
              Price:
            </span>{" "}
            {coin.current_price.toLocaleString()}$
          </p>
          <div className="grid-container">
            <div className="grid-container2">
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Market Cap:
              </h3>
              <span>
                {coin.market_cap
                  ? (coin.market_cap / 1000000).toFixed(3) + "M $"
                  : "-"}
              </span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Market Cap Rank:
              </h3>
              <span>{coin.market_cap_rank}</span>
            </div>
            <div className="grid-container2">
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Total Supply:
              </h3>
              <span>
                {coin.total_supply
                  ? (coin.total_supply / 1000000).toFixed(3) + "M $"
                  : "-"}
              </span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Max Supply:
              </h3>
              <span>
                {coin.max_supply
                  ? (coin.max_supply / 1000000).toFixed(3) + "M $"
                  : "-"}
              </span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Circulating Supply:
              </h3>
              <span>
                {coin.circulating_supply
                  ? (coin.circulating_supply / 1000000).toFixed(3) + "M $"
                  : "-"}
              </span>
            </div>
            <div className="grid-container2">
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                ATH:
              </h3>
              <span>{coin.ath.toLocaleString()}$</span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                ATH %:
              </h3>
              <span>{coin.ath_change_percentage.toFixed(1) + "%"}</span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Date:
              </h3>
              <span>{coin.ath_date.slice(0, 10)}</span>
            </div>
            <div className="grid-container2">
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                ATL:
              </h3>
              <span>{coin.atl.toLocaleString()}$</span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                ATL %:
              </h3>
              <span>{coin.atl_change_percentage.toFixed(1) + "%"}</span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Date:
              </h3>
              <span>{coin.atl_date.slice(0, 10)}</span>
            </div>
          </div>
          <p className="center">
            <span
              className={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                  : userData?.color[0] === "D"
                  ? "title Dshadow"
                  : "title Lshadow"
              }
            >
              Volume :{" "}
            </span>
            {coin.total_volume
              ? (coin.total_volume / 1000000).toFixed(3) + "M $"
              : "-"}
          </p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default IndividualCoinData;
