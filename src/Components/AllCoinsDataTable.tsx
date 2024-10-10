import React from "react";
import { coinDataType, currentIDPropsType } from "../Types/AppTypes";
import { useAppSelector } from "../Store/Store";
import TableDataRow from "./TableDataRow";

const AllCoinsDataTable = ({ currentID }: currentIDPropsType) => {
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
  return (
    <div className="user-background">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Symbol</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Volume</th>
            <th>1h</th>
            <th>1j</th>
            <th>7j</th>
            <th>14j</th>
            <th>30j</th>
            <th>200j</th>
            <th>1y</th>
            <th>Ath</th>
          </tr>
        </thead>
        <tbody>
          {coinData &&
            coinData.map((coin) => <TableDataRow coin={coin} key={coin.id} />)}
        </tbody>
      </table>
    </div>
  );
};

export default AllCoinsDataTable;
