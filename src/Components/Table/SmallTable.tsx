//Import Dependencies
import { useState, useEffect } from "react";
//Import Custom Hook and Function
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
import { sortSwitch } from "../../Utils/SortSwitch";
//Import Components For the Header and the Small Row
import TableHeader, { tableColums } from "./TableHeader";
import SmallTableDataRow from "./SmallTableDataRow";
//Import Icons
import { TbArrowBadgeLeft } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
//Import Custom Type
import { coinDataType } from "../../Types/AppTypes";
//Props Type for UserID, tempColor, the Data and Fav Data to map and the tempFavArray State
type propsType = {
  data: coinDataType[];
  favArrayState: coinDataType[];
  currentID: string;
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
  //Selected Sort and Display Data State used to Sort and Control the Selected Data in the Custom Select
  const [displayData, setDisplayData] = useState("Market Cap");
  const [selectedSort, setSelectedSort] = useState("Rank");
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //Define the Fixed Header, and the Option for the Last Colums
  const tableHeaderData: string[] = tableColums.slice(0, 5);
  const selectOptions: string[] = tableColums.slice(6, 16);
  //This Function Handle the Change of Option in the Custom Select
  const handleDataSwitch = (value: string) => {
    setDisplayData(value);
    setSelectedSort(value);
  };
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);
  //Fixed Part of the Small Table Header, map the tableHeaderData to create TH
  const fixedHeader = (
    <>
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
    </>
  );
  //Custom Select and Header With Shadow for the Last Dynamique Colum of the Table
  const customSelect = (
    <th
      className={
        tempColor.length > 0
          ? tempColor[0] === "D"
            ? "Dshadow selectHeader"
            : "Lshadow selectHeader"
          : userData?.color[0] === "D"
          ? "Dshadow selectHeader"
          : "Lshadow selectHeader"
      }
    >
      <div className="header-select-container">
        {/* Display the Selected Option in the Last Colum Table Header */}
        {displayData}
        {/* Display the Custom Select Dropdown Icon */}
        <RiArrowDropDownLine />
      </div>
      {/* Map the Select Option in a List  */}
      <ul
        className={
          tempColor.length > 0
            ? tempColor[0] === "D"
              ? `${tempColor}-select Dselect`
              : `${tempColor}-select Lselect`
            : userData?.color[0] === "D"
            ? `${userData?.color}-select Dselect`
            : `${userData?.color}-select Lselect`
        }
      >
        {selectOptions.map((option) => (
          <li
            className="pointer"
            onClick={() => handleDataSwitch(option)}
            key={option}
          >
            {option}
            <span>
              <TbArrowBadgeLeft />
            </span>
          </li>
        ))}
      </ul>
    </th>
  );
  //Table Header Structure
  const tableHeader = (
    <thead>
      <tr>
        {fixedHeader}
        {customSelect}
      </tr>
    </thead>
  );
  //Full Table Structure
  const completeSmallTable = (
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
            sortSwitch(data, selectedSort)
              .slice(0, userData ? userData.range : 24)
              .map((coin) => (
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

  return completeSmallTable;
};

export default SmallTable;
