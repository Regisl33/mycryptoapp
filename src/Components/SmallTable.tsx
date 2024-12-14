import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import { coinDataType } from "../Types/AppTypes";
import { sortSwitch } from "../Utils/SortSwitch";
import SmallTableDataRow from "./SmallTableDataRow";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import { tableColums } from "./TableHeader";

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
  const [selectedSort, setSelectedSort] = useState("Rank");
  const tableHeaderData: string[] = tableColums.slice(0, 5);

  const selectOptions: string[] = tableColums.slice(6, 16);

  const handleDataSwitch = (value: string) => {
    setDisplayData(value);
    setSelectedSort(value);
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);

  const tableHeader = (
    <thead>
      <tr>
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
          <label
            htmlFor="selectData"
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
            {displayData}
            <RiArrowDropDownLine />
            <ul
              className={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? `${tempColor}-select`
                    : `${tempColor}-select`
                  : userData?.color[0] === "D"
                  ? `${userData?.color}-select`
                  : `${userData?.color}-select`
              }
            >
              {selectOptions.map((option) => (
                <li onClick={() => handleDataSwitch(option)} key={option}>
                  {option}
                </li>
              ))}
            </ul>
          </label>
        </th>
      </tr>
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
