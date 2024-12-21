//Import Dependencies
import { useCallback, useEffect, useState } from "react";
//Import Custom Hook and Function
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
import { getCurrentUserFavorite } from "../../Features/CoinGeeckoData/CoinDataSlice";
import { useAppSelector } from "../../Store/Store";
import { sortSwitch } from "../../Utils/SortSwitch";
//Import Components For the Header and the Table Row and the Mobile Screen Table
import TableDataRow from "./TableDataRow";
import TableHeader, { tableColums } from "./TableHeader";
import SmallTable from "./SmallTable";
//Import Custom Type
import { coinDataType } from "../../Types/AppTypes";
//Props Type for UserID, the tempColor, need Reload and the tempFavArray State
export type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
  needReload?: boolean;
};

const AllCoinsDataTable = ({
  currentID,
  tempColor,
  tempFavArray,
  setTempFavArray,
  needReload,
}: propsType) => {
  //Selected Sort, Favorite and Data State used to Sort the Coin With the Favorite Always on Top
  const [selectedSort, setselectedSort] = useState("Rank");
  const [favArrayState, setFavArrayState] = useState<coinDataType[]>([]);
  const [data, setData] = useState<coinDataType[]>([]);
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //Get Coin Data
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
  //This Function Set The Fav Data and The Normal Data Split in Two State
  const splitFav = (arr1: coinDataType[], arr2: coinDataType[]) => {
    setFavArrayState(arr1);
    setData(arr2);
  };
  //This Function Split the Fav Coin and Other Coin usign the Split Fav Function
  const handleFavSorting = useCallback(() => {
    if (userData && tempFavArray.length > 0) {
      //Define our Fav Array From the Temp Fav Array and the Temp Array for the Other Coin
      let favArray = [...tempFavArray];
      let tempArray = [...coinData];
      //Filter the Temp Array to Remove the Favorite Coins From it
      for (let i = 0; i < favArray.length; i++) {
        tempArray = tempArray.filter((coin) => coin.id !== favArray[i].id);
      }
      //Call Split Fav to Split the Coin in the State
      splitFav(favArray, tempArray);
    } else if (userData?.favorites && userData.favorites.length > 0) {
      //Define our Fav Array From the User DB Fav Array and the Temp Array for the Other Coin
      let favArray = [...userData.favorites];
      let tempArray = [...coinData];
      //Filter the Temp Array to Remove the Favorite Coins From it
      for (let i = 0; i < favArray.length; i++) {
        tempArray = tempArray.filter((coin) => coin.id !== favArray[i]);
      }
      //Get All Info From the Fav Coin ID From the User DB
      let newArray = getCurrentUserFavorite(favArray, coinData);
      //Call Split Fav to Split the Coin in the State
      splitFav(newArray, tempArray);
    } else {
      //There is no Fav Coin so Set All Coin in the Data
      setData(coinData);
    }
  }, [coinData, tempFavArray, userData]);
  //This UseEffect Calls our Function To Split our Coin and Favorite Coin in the State
  useEffect(() => {
    handleFavSorting();
  }, [handleFavSorting]);
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);
  //This UseEffect Test if needReload is true and if so it reloads the page
  useEffect(() => {
    if (needReload) {
      window.location.reload();
    }
  }, [needReload]);
  //Header for our Table
  const tableHeader = (
    <thead>
      <tr>
        {tableColums.map((content) => (
          <TableHeader
            currentID={currentID}
            tempColor={tempColor}
            content={content}
            selectedSort={selectedSort}
            setSelectedSort={setselectedSort}
            key={content}
          />
        ))}
      </tr>
    </thead>
  );
  //Display the Body of our Table using sortSwitch to Sort the Coins
  const tableBodySwitch = (
    <tbody>
      {favArrayState &&
        sortSwitch(favArrayState, selectedSort).map((coin) => (
          <TableDataRow
            coin={coin}
            currentID={currentID}
            tempFavArray={tempFavArray}
            setTempFavArray={setTempFavArray}
            key={coin.id}
          />
        ))}
      {data &&
        sortSwitch(data, selectedSort)
          .slice(0, userData ? userData.range : 24)
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
  //Full Structure of the Table Page Using the Small Table Components for Mobile Settings
  const tablePage = (
    <div className="main-container table-container">
      <table className="table">
        {tableHeader}
        {tableBodySwitch}
      </table>
      <SmallTable
        currentID={currentID}
        tempColor={tempColor}
        favArrayState={favArrayState}
        data={data}
        tempFavArray={tempFavArray}
        setTempFavArray={setTempFavArray}
      />
    </div>
  );

  return tablePage;
};

export default AllCoinsDataTable;
