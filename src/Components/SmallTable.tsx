import React, { ChangeEvent, useState } from "react";
import TableHeader from "./TableHeader";
import { coinDataType } from "../Types/AppTypes";
import { sortSwitch } from "./SortSwitch";
import SmallTableDataRow from "./SmallTableDataRow";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";

type propsType = {
  data: coinDataType[];
  favArrayState: coinDataType[];
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const SmallTable = ({
  data,
  favArrayState,
  tempColor,
  currentID,
  tempFavArray,
  setTempFavArray,
}: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const [displayData, setDisplayData] = useState("Market Cap");
  const [selectedSort, setSelectedSort] = useState("");
  const tableHeaderData: string[] = [
    "Rank",
    "Favorite",
    "Symbol",
    "Logo",
    "Name",
  ];

  const selectOptions: string[] = [
    "Market Cap",
    "Price",
    "Volume",
    "1h",
    "1j",
    "7j",
    "14j",
    "30j",
    "200j",
    "1y",
    "Ath",
  ];

  const handleDataSwitch = (value: string) => {
    setDisplayData(value);
    setSelectedSort(value);
  };

  const tableHeader = (
    <thead>
      {tableHeaderData.map((content) => (
        <TableHeader
          currentID={currentID}
          tempColor={tempColor}
          content={content}
          setSelectedSort={setSelectedSort}
          selectedSort={selectedSort}
          key={content}
        />
      ))}
      <th>
        <label htmlFor="selectData" className="offscreen">
          Select Data you want Displayed
        </label>
        <select
          className={
            tempColor.length > 0
              ? tempColor[0] === "D"
                ? "Dselect"
                : "Lselect"
              : userData?.color[0] === "D"
              ? "Dselect"
              : "Lselect"
          }
          id="selectData"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleDataSwitch(e.target.value)
          }
        >
          {selectOptions.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </th>
    </thead>
  );

  return (
    <div className="smallTable">
      <table>
        {tableHeader}
        <tbody>
          {favArrayState &&
            sortSwitch(favArrayState, selectedSort).map((coin) => (
              <SmallTableDataRow
                coin={coin}
                currentID={currentID}
                tempFavArray={tempFavArray}
                setTempFavArray={setTempFavArray}
                displayData={displayData}
                key={coin.id}
              />
            ))}
          {data &&
            sortSwitch(data, selectedSort).map((coin) => (
              <SmallTableDataRow
                coin={coin}
                currentID={currentID}
                tempFavArray={tempFavArray}
                setTempFavArray={setTempFavArray}
                displayData={displayData}
                key={coin.id}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SmallTable;
