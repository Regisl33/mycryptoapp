import React, { ChangeEvent, useState } from "react";
import { currentIDPropsType } from "../Types/LandingTypes";
import { coinDataType } from "../Types/AppTypes";
import { useAppSelector } from "../Store/Store";
import IndividualSearchCoin from "./IndividualSearchCoin";

const SearchPage = ({ currentID }: currentIDPropsType) => {
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
  return (
    <div className="user-background">
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
  );
};

export default SearchPage;
