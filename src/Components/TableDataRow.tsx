import React from "react";
import { coinDataType } from "../Types/AppTypes";
import { FaRegStar } from "react-icons/fa6";
import { useFavoriteMutation } from "../Features/LandingPage/UserSlice";
import { favoriteMutationType, fullUserType } from "../Types/LandingTypes";

type propsType = {
  coin: coinDataType;
  user: fullUserType;
};

const TableDataRow = ({ coin, user }: propsType) => {
  const [favoriteMutation] = useFavoriteMutation();

  const handleAddDelete = (unique: boolean, favArray: coinDataType[]) => {
    if (unique) {
      let newFav: favoriteMutationType = {
        options: {
          options: {
            favorites: [coin, ...favArray],
          },
        },
        id: user.id,
      };
      try {
        favoriteMutation(newFav).unwrap();
      } catch (err) {
        console.log(err);
      }
    } else {
      let newArray = favArray.filter((fav) => fav.id !== coin.id);
      let newFav: favoriteMutationType = {
        options: {
          options: {
            favorites: newArray,
          },
        },
        id: user.id,
      };
      try {
        favoriteMutation(newFav).unwrap();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFavorite = () => {
    if (user.options?.favorites) {
      let favoriteArray = [...user.options.favorites];
      let isUnique = true;
      favoriteArray.map((fav) =>
        fav.id === coin.id ? (isUnique = false) : null
      );
      handleAddDelete(isUnique, favoriteArray);
    } else {
      let newFav: favoriteMutationType = {
        options: {
          options: {
            favorites: [coin],
          },
        },
        id: user.id,
      };
      try {
        favoriteMutation(newFav).unwrap();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <tr>
      <td>{coin.market_cap_rank}</td>
      <td>
        <FaRegStar onClick={() => handleFavorite()} />
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>
        <img src={coin.image} alt={`${coin.name} image`} />
      </td>
      <td>{coin.name}</td>
      <td>
        {coin.market_cap ? (coin.market_cap / 1000000).toFixed(3) + "M $" : "-"}
      </td>
      <td>
        {coin.current_price ? coin.current_price.toLocaleString() + "$" : "-"}
      </td>
      <td>
        {coin.total_volume
          ? (coin.total_volume / 1000000).toFixed(3) + "M $"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_1h_in_currency
          ? coin.price_change_percentage_1h_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_24h_in_currency
          ? coin.price_change_percentage_24h_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_7d_in_currency
          ? coin.price_change_percentage_7d_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_14d_in_currency
          ? coin.price_change_percentage_14d_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_30d_in_currency
          ? coin.price_change_percentage_30d_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_200d_in_currency
          ? coin.price_change_percentage_200d_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_1y_in_currency
          ? coin.price_change_percentage_1y_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.ath_change_percentage
          ? coin.ath_change_percentage > -1
            ? "ATH"
            : coin.ath_change_percentage.toFixed(1) + "%"
          : "-"}
      </td>
    </tr>
  );
};

export default TableDataRow;
