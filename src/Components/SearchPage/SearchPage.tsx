//Import Dependencies
import { ChangeEvent, useState, useEffect } from "react";
//Import Custom Hook
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
//Import Custom Types useSelector
import { useAppSelector } from "../../Store/Store";
//Import IndividualSearchCoin Component
import IndividualSearchCoin from "./IndividualSearchCoin";
//Import Custom Types
import { coinDataType, IDColorTempFavArrPropsType } from "../../Types/AppTypes";

const SearchPage = ({
  currentID,
  tempColor,
  tempFavArray,
  setTempFavArray,
}: IDColorTempFavArrPropsType) => {
  //Define State for the Search Value and the Result Filtered by the Search Value
  const [searchValue, setSearchValue] = useState("");
  const [filteredResult, setFilteredResult] = useState<coinDataType[]>();
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //Get Coin Data
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
  //This Function Handle Every Change in the Search Controlled Input
  const handleSearch = (value: string) => {
    setSearchValue(value);
    let newArray = coinData
      .filter(
        (coin) => coin.name.includes(value) || coin.symbol.includes(value)
      )
      .sort((a, b) => a.market_cap_rank - b.market_cap_rank)
      .slice(0, 12);

    setFilteredResult(newArray);
  };
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //Search Input Container
  const searchInput = (
    <div className="search-container">
      <label htmlFor="search" className="offscreen">
        Search Input
      </label>
      <input
        className={
          tempColor.length > 0
            ? tempColor[0] === "D"
              ? "Dinput"
              : "Linput"
            : userData?.color[0] === "D"
            ? "Dinput"
            : "Linput"
        }
        type="text"
        id="search"
        placeholder="Search a Coin"
        autoComplete="off"
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSearch(e.target.value)
        }
      />
    </div>
  );
  //Search Result Container
  const resultContainer = (
    <div className="result-container">
      {filteredResult ? (
        filteredResult.map((result) => (
          <IndividualSearchCoin
            coin={result}
            currentID={currentID}
            tempColor={tempColor}
            tempFavArray={tempFavArray}
            setTempFavArray={setTempFavArray}
            key={result.id}
          />
        ))
      ) : (
        <p>There is no matching Cryptocurrency</p>
      )}
    </div>
  );
  //Full Search Page Structure
  const SearchPageStructure = (
    <div className="main-container">
      {searchInput}
      {resultContainer}
    </div>
  );

  return SearchPageStructure;
};

export default SearchPage;
