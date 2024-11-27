import { useEffect, useState } from "react";
import { coinDataType } from "../Types/AppTypes";
import { useAppSelector } from "../Store/Store";
import TableDataRow from "./TableDataRow";
import { tableColums } from "./TableColums";
import TableHeader from "./TableHeader";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import Footer from "./Footer";
import Header from "./Header";
import { sortSwitch } from "./SortSwitch";
import SmallTable from "./SmallTable";

type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const AllCoinsDataTable = ({
  currentID,
  tempColor,
  tempFavArray,
  setTempFavArray,
}: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const [selectedSort, setselectedSort] = useState("Rank");

  const [favArrayState, setFavArrayState] = useState<coinDataType[]>([]);
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
  const [data, setData] = useState<coinDataType[]>([]);

  const handleFavSorting = () => {
    if (userData && tempFavArray.length > 0) {
      let favArray = [...tempFavArray];
      let tempArray = [...coinData];

      for (let i = 0; i < favArray.length; i++) {
        tempArray = tempArray.filter((coin) => coin.id !== favArray[i].id);
      }
      setFavArrayState(favArray);
      setData(tempArray);
    } else if (userData?.favorites) {
      if (userData.favorites.length > 0) {
        let favArray = [...userData.favorites];
        let tempArray = [...coinData];

        for (let i = 0; i < favArray.length; i++) {
          tempArray = tempArray.filter((coin) => coin.id !== favArray[i].id);
        }
        setFavArrayState(favArray);
        setData(tempArray);
      }
    } else {
      setData(data);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    handleFavSorting();
  }, [coinData, tempFavArray]);

  useEffect(() => {
    if (tempFavArray.length > 0) {
      window.location.reload();
    }
  }, []);

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
        sortSwitch(data, selectedSort).map((coin) => (
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
      <Header currentID={currentID} tempColor={tempColor} />
      <div className="main-container table-container">
        <table className="table">
          {tableHeader}
          {tableBodySwitch}
        </table>
        <SmallTable
          currentID={currentID}
          favArrayState={favArrayState}
          data={data}
          tempFavArray={tempFavArray}
          setTempFavArray={setTempFavArray}
        />
      </div>
      <Footer />
    </div>
  );

  return tablePage;
};

export default AllCoinsDataTable;
