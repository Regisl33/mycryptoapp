import { useEffect } from "react";
import { coinDataType } from "../Types/AppTypes";
import { useNavigate } from "react-router";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import DisplayOfValue from "./DisplayOfValue";
import { colorPicker } from "../Utils/ColorUtilities";
import FavoriteSwitch from "./FavoriteSwitch";

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
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const navigate = useNavigate();

  const getShadow = (): string => {
    let classes = "";
    tempColor.length > 0
      ? tempColor[0] === "D"
        ? (classes = "Dshadow")
        : (classes = "Lshadow")
      : userData?.color[0] === "D"
      ? (classes = "Dshadow")
      : (classes = "Lshadow");

    return classes;
  };

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
        <h2
          className={getShadow()}
          onClick={() => navigate(`/coin/:${coin.id}`)}
        >
          {coin.name}
        </h2>
        <img src={coin.image} alt={coin.name + "image"} />
        <figcaption>
          {coin.symbol.toUpperCase()}{" "}
          <DisplayOfValue
            valueType="%"
            value={coin.price_change_percentage_24h_in_currency}
          />
        </figcaption>
      </figure>
      <div className="search-container">
        <FavoriteSwitch
          currentID={currentID}
          tempFavArray={tempFavArray}
          setTempFavArray={setTempFavArray}
          coin={coin}
          getShadow={getShadow}
        />
        <div className="coin-info-container">
          <table>
            <tbody>
              <tr>
                <th className={getShadow()}>Market Cap:</th>
                <td>
                  <DisplayOfValue valueType="$" value={coin.market_cap} />
                </td>
                <th className={getShadow()}>Market Cap Rank:</th>
                <td>{coin.market_cap_rank}</td>
              </tr>
              <tr>
                <th className={getShadow()}>Price:</th>
                <td>{coin.current_price.toLocaleString() + "$"}</td>
                <th className={getShadow()}>Volume:</th>
                <td>
                  <DisplayOfValue valueType="$" value={coin.total_volume} />
                </td>
              </tr>
              <tr>
                <th className={getShadow()}>Ath:</th>
                <td style={{ color: colorPicker(coin.atl_change_percentage) }}>
                  {coin.ath_change_percentage.toFixed(1) + "%"}
                </td>
                <th className={getShadow()}>Ath Date:</th>
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
