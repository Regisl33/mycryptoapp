import React, { ChangeEvent, useState, useEffect } from "react";
import { currentIDPropsType, fullUserType } from "../Types/LandingTypes";
import { coinDataType } from "../Types/AppTypes";
import { useAppSelector } from "../Store/Store";
import IndividualSearchCoin from "./IndividualSearchCoin";
import { useGetAllUsersQuery } from "../Features/LandingPage/UserSlice";
import Header from "./Header";
import Footer from "./Footer";

const SearchPage = ({ currentID }: currentIDPropsType) => {
  const [currentUser, setCurrentUser] = useState<fullUserType>();
  const { data: userApiData, isError, error } = useGetAllUsersQuery("User");
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
    if (!isError) {
      if (userApiData?.ids) {
        userApiData.ids.map((id) =>
          id === currentID
            ? setCurrentUser(userApiData.entities[id])
            : console.log(id)
        );
      } else {
        console.log("There is no data in the user Array");
      }
    } else {
      console.log(error);
    }
  }, []);

  return (
    <div
      className={
        currentUser?.options?.color ? currentUser.options.color : "Lcolor1"
      }
    >
      <Header user={currentUser} />
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
