import { useEffect } from "react";
import { coinDataType } from "../Types/AppTypes";
import { useNavigate } from "react-router";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";

type propsType = {
  coin: coinDataType;
  currentID: number;
  tempColor: string;
};

const IndividualSearchCoin = ({ coin, currentID, tempColor }: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

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
        <h2 onClick={() => navigate(`/coin/:${coin.id}`)}>{coin.name}</h2>
        <img src={coin.image} alt={coin.name + "image"} />
        <figcaption>
          {coin.symbol.toUpperCase()}{" "}
          <span>
            {coin.price_change_percentage_24h_in_currency.toFixed(1) + "%"}
          </span>
        </figcaption>
      </figure>
      <div className="coin-info-container">
        <table>
          <tbody>
            <tr>
              <th>Market Cap:</th>
              <td>
                {coin.market_cap
                  ? (coin.market_cap / 1000000).toFixed(3) + "M $"
                  : "-"}
              </td>
              <th>Market Cap Rank:</th>
              <td>{coin.market_cap_rank}</td>
            </tr>
            <tr>
              <th>Price:</th>
              <td>{coin.current_price.toLocaleString() + "$"}</td>
              <th>Volume:</th>
              <td>
                {coin.total_volume
                  ? (coin.total_volume / 1000000).toFixed(3) + "M $"
                  : "-"}
              </td>
            </tr>
            <tr>
              <th>Ath:</th>
              <td>{coin.ath_change_percentage.toFixed(1) + "%"}</td>
              <th>Ath Date:</th>
              <td>{coin.ath_date.slice(0, 10)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndividualSearchCoin;
