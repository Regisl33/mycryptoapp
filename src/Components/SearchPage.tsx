import { ChangeEvent, useState, useEffect } from "react";
import { coinDataType } from "../Types/AppTypes";
import { useAppSelector } from "../Store/Store";
import IndividualSearchCoin from "./IndividualSearchCoin";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import Header from "./Header";
import Footer from "./Footer";

type propsType = {
  currentID: number;
  tempColor: string;
};

const SearchPage = ({ currentID, tempColor }: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const [searchValue, setSearchValue] = useState("");
  const [filteredResult, setFilteredResult] = useState<coinDataType[]>();

  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );

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

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, []);

  return (
    <div
      className={
        tempColor.length > 0 && tempColor !== userData?.color
          ? tempColor
          : userData?.color
      }
    >
      <Header currentID={currentID} tempColor={tempColor} />
      <div className="main-container">
        <div className="search-container">
          <label htmlFor="search" className="offscreen">
            Search Input
          </label>
          <input
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
        <div className="result-container">
          {filteredResult ? (
            filteredResult.map((result) => (
              <IndividualSearchCoin coin={result} key={result.id} />
            ))
          ) : (
            <p>There is no matching Cryptocurrency</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
