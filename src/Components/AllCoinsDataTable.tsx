import { useEffect, useState } from "react";
import { coinDataType } from "../Types/AppTypes";
import { currentIDPropsType } from "../Types/LandingTypes";
import { useAppSelector } from "../Store/Store";
import TableDataRow from "./TableDataRow";
import { tableColums } from "./TableColums";
import TableHeader from "./TableHeader";

const AllCoinsDataTable = ({ currentID }: currentIDPropsType) => {
  const [selectedHeader, setSelectedHeader] = useState("Rank");
  const [reverseSort, setReverseSort] = useState(false);
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
  const [sortedData, setSortedData] = useState(coinData);

  const handleSortData = () => {
    switch (selectedHeader) {
      case "Rank":
        if (reverseSort) {
          setSortedData(
            coinData.sort((a, b) => b.market_cap_rank - a.market_cap_rank)
          );
        } else {
          setSortedData(
            coinData.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
          );
        }
        break;
      case "Market Cap":
        if (reverseSort) {
          setSortedData(coinData.sort((a, b) => b.market_cap - a.market_cap));
        } else {
          setSortedData(coinData.sort((a, b) => a.market_cap - b.market_cap));
        }
        break;
      case "Price":
        if (reverseSort) {
          setSortedData(
            coinData.sort((a, b) => b.current_price - a.current_price)
          );
        } else {
          setSortedData(
            coinData.sort((a, b) => a.current_price - b.current_price)
          );
        }
        break;

      case "Volume":
        if (reverseSort) {
          setSortedData(
            coinData.sort((a, b) => b.total_volume - a.total_volume)
          );
        } else {
          setSortedData(
            coinData.sort((a, b) => a.total_volume - b.total_volume)
          );
        }
        break;
      case "1h":
        if (reverseSort) {
          setSortedData(
            coinData.sort(
              (a, b) =>
                b.price_change_percentage_1h_in_currency -
                a.price_change_percentage_1h_in_currency
            )
          );
        } else {
          setSortedData(
            coinData.sort(
              (a, b) =>
                a.price_change_percentage_1h_in_currency -
                b.price_change_percentage_1h_in_currency
            )
          );
        }
        break;

      case "1j":
        if (reverseSort) {
          setSortedData(
            coinData.sort(
              (a, b) =>
                b.price_change_percentage_24h_in_currency -
                a.price_change_percentage_24h_in_currency
            )
          );
        } else {
          setSortedData(
            coinData.sort(
              (a, b) =>
                a.price_change_percentage_24h_in_currency -
                b.price_change_percentage_24h_in_currency
            )
          );
        }
        break;
      case "7j":
        if (reverseSort) {
          setSortedData(
            coinData.sort(
              (a, b) =>
                b.price_change_percentage_7d_in_currency -
                a.price_change_percentage_7d_in_currency
            )
          );
        } else {
          setSortedData(
            coinData.sort(
              (a, b) =>
                a.price_change_percentage_7d_in_currency -
                b.price_change_percentage_7d_in_currency
            )
          );
        }
        break;
      case "14j":
        if (reverseSort) {
          setSortedData(
            coinData.sort(
              (a, b) =>
                b.price_change_percentage_14d_in_currency -
                a.price_change_percentage_14d_in_currency
            )
          );
        } else {
          setSortedData(
            coinData.sort(
              (a, b) =>
                a.price_change_percentage_14d_in_currency -
                b.price_change_percentage_14d_in_currency
            )
          );
        }
        break;
      case "30j":
        if (reverseSort) {
          setSortedData(
            coinData.sort(
              (a, b) =>
                b.price_change_percentage_30d_in_currency -
                a.price_change_percentage_30d_in_currency
            )
          );
        } else {
          setSortedData(
            coinData.sort(
              (a, b) =>
                a.price_change_percentage_30d_in_currency -
                b.price_change_percentage_30d_in_currency
            )
          );
        }
        break;
      case "200j":
        if (reverseSort) {
          setSortedData(
            coinData.sort(
              (a, b) =>
                b.price_change_percentage_200d_in_currency -
                a.price_change_percentage_200d_in_currency
            )
          );
        } else {
          setSortedData(
            coinData.sort(
              (a, b) =>
                a.price_change_percentage_200d_in_currency -
                b.price_change_percentage_200d_in_currency
            )
          );
        }
        break;
      case "1y":
        if (reverseSort) {
          setSortedData(
            coinData.sort(
              (a, b) =>
                b.price_change_percentage_1y_in_currency -
                a.price_change_percentage_1y_in_currency
            )
          );
        } else {
          setSortedData(
            coinData.sort(
              (a, b) =>
                a.price_change_percentage_1y_in_currency -
                b.price_change_percentage_1y_in_currency
            )
          );
        }
        break;

      case "Ath":
        if (reverseSort) {
          setSortedData(
            coinData.sort(
              (a, b) => b.ath_change_percentage - a.ath_change_percentage
            )
          );
        } else {
          setSortedData(
            coinData.sort(
              (a, b) => a.ath_change_percentage - b.ath_change_percentage
            )
          );
        }
        break;

      case "Ath":
        if (reverseSort) {
          setSortedData(
            coinData.sort(
              (a, b) => b.ath_change_percentage - a.ath_change_percentage
            )
          );
        } else {
          setSortedData(
            coinData.sort(
              (a, b) => a.ath_change_percentage - b.ath_change_percentage
            )
          );
        }
        break;
      default:
        console.log("Test");
    }
  };

  const handleSortChange = (header: string) => {
    if (header === selectedHeader) {
      setReverseSort(!reverseSort);
    } else {
      setSelectedHeader(header);
      setReverseSort(false);
    }

    handleSortData();
  };

  // useEffect(() => {
  //   if (coinData.length > 0) {
  //     handleSortData();
  //   } else {
  //     console.log("Cannot reach the server");
  //   }
  // }, [selectedHeader, reverseSort]);
  return (
    <div className="user-background">
      <table>
        <thead>
          <tr>
            {tableColums.map((content) => (
              <TableHeader
                content={content}
                handleSortChange={handleSortChange}
                key={content}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData &&
            sortedData.map((coin) => (
              <TableDataRow coin={coin} key={coin.id} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCoinsDataTable;
