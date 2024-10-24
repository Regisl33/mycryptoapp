import { useEffect, useState } from "react";
import { coinDataType } from "../Types/AppTypes";
import { currentIDPropsType } from "../Types/LandingTypes";
import { useAppSelector } from "../Store/Store";
import TableDataRow from "./TableDataRow";
import { tableColums } from "./TableColums";
import TableHeader from "./TableHeader";

const AllCoinsDataTable = ({ currentID }: currentIDPropsType) => {
  const [selectedSort, setselectedSort] = useState("Rank");
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
  const [sortedData, setSortedData] = useState(coinData);
  let dataArray = sortedData;

  const sortData = () => {
    let newArray: coinDataType[] = [];
    switch (selectedSort) {
      case "Rank":
        newArray = dataArray.sort(
          (a, b) => a.market_cap_rank - b.market_cap_rank
        );
        return newArray;
      default:
        console.log("Unknown Sort Method");
        newArray = dataArray.sort(
          (a, b) => a.market_cap_rank - b.market_cap_rank
        );
        return newArray;
    }
  };

  useEffect(() => {
    setSortedData(sortData());
  }, [selectedSort]);

  return (
    <div className="user-background">
      <table>
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
