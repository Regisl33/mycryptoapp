import { useEffect, useState } from "react";
import { coinDataType } from "../Types/AppTypes";
import { useAppSelector } from "../Store/Store";
import TableDataRow from "./TableDataRow";
import { tableColums } from "./TableColums";
import TableHeader from "./TableHeader";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import Footer from "./Footer";
import Header from "./Header";

type propsType = {
  currentID: number;
  tempColor: string;
};

const AllCoinsDataTable = ({ currentID, tempColor }: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const [selectedSort, setselectedSort] = useState("Rank");
  const [tempFavArray, setTempFavArray] = useState<coinDataType[]>([]);
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
  const [data, setData] = useState<coinDataType[]>([]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    setData([...coinData]);
  }, [coinData]);

  const tableHeader = (
    <thead>
      <tr>
        {tableColums.map((content) => (
          <TableHeader
            content={content}
            selectedSort={selectedSort}
            setSelectedSort={setselectedSort}
            key={content}
          />
        ))}
      </tr>
    </thead>
  );

  const tableBodySwitch = (
    <tbody>
      {data &&
        data
          .sort((a, b) => {
            switch (selectedSort) {
              case "Rank":
                return a.market_cap_rank - b.market_cap_rank;
              case "Rankreverse":
                return b.market_cap_rank - a.market_cap_rank;
              case "Market Cap":
                return a.market_cap - b.market_cap;
              case "Market Capreverse":
                return b.market_cap - a.market_cap;
              case "Price":
                return a.current_price - b.current_price;
              case "Pricereverse":
                return b.current_price - a.current_price;
              case "Volume":
                return a.total_volume - b.total_volume;
              case "Volumereverse":
                return b.total_volume - a.total_volume;
              case "1h":
                return (
                  a.price_change_percentage_1h_in_currency -
                  b.price_change_percentage_1h_in_currency
                );
              case "1hreverse":
                return (
                  b.price_change_percentage_1h_in_currency -
                  a.price_change_percentage_1h_in_currency
                );
              case "1j":
                return (
                  a.price_change_percentage_24h_in_currency -
                  b.price_change_percentage_24h_in_currency
                );
              case "1jreverse":
                return (
                  b.price_change_percentage_24h_in_currency -
                  a.price_change_percentage_24h_in_currency
                );
              case "7j":
                return (
                  a.price_change_percentage_7d_in_currency -
                  b.price_change_percentage_7d_in_currency
                );
              case "7jreverse":
                return (
                  b.price_change_percentage_7d_in_currency -
                  a.price_change_percentage_7d_in_currency
                );
              case "14j":
                return (
                  a.price_change_percentage_14d_in_currency -
                  b.price_change_percentage_14d_in_currency
                );
              case "14jreverse":
                return (
                  b.price_change_percentage_14d_in_currency -
                  a.price_change_percentage_14d_in_currency
                );
              case "30j":
                return (
                  a.price_change_percentage_30d_in_currency -
                  b.price_change_percentage_30d_in_currency
                );
              case "30jreverse":
                return (
                  b.price_change_percentage_30d_in_currency -
                  a.price_change_percentage_30d_in_currency
                );
              case "200j":
                return (
                  a.price_change_percentage_200d_in_currency -
                  b.price_change_percentage_200d_in_currency
                );
              case "200jreverse":
                return (
                  b.price_change_percentage_200d_in_currency -
                  a.price_change_percentage_200d_in_currency
                );
              case "1y":
                return (
                  a.price_change_percentage_1y_in_currency -
                  b.price_change_percentage_1y_in_currency
                );
              case "1yreverse":
                return (
                  b.price_change_percentage_1y_in_currency -
                  a.price_change_percentage_1y_in_currency
                );
              case "Ath":
                return a.ath_change_percentage - b.ath_change_percentage;
              case "Athreverse":
                return b.ath_change_percentage - a.ath_change_percentage;

              default:
                return a.market_cap_rank - b.market_cap_rank;
            }
          })
          .map((coin) => (
            <TableDataRow
              coin={coin}
              currentID={currentID}
              tempFavArray={tempFavArray}
              setTempFavArray={setTempFavArray}
              key={coin.id}
            />
          ))}
    </tbody>
  );

  const tablePage = (
    <div
      className={
        tempColor.length > 0 && tempColor !== userData?.color
          ? tempColor
          : userData?.color
      }
    >
      <Header currentID={currentID} />
      <div className="main-container">
        <table>
          {tableHeader}
          {tableBodySwitch}
        </table>
      </div>
      <Footer />
    </div>
  );

  return tablePage;
};

export default AllCoinsDataTable;
