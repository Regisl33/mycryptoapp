import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import Home from "../Home";
import Parameters from "../Params/Parameters";
import AllCoinsDataTable from "../Table/AllCoinsDataTable";
import SearchPage from "../SearchPage";
import IndividualCoinData from "../IndividualCoinData";
import ErrorNotFoundPage from "../LoginPages/ErrorNotFoundPage";
import { coinDataType } from "../../Types/AppTypes";

type propsType = {
  currentID: number | undefined;
  tempColor: string;
  setTempColor: React.Dispatch<React.SetStateAction<string>>;
  setCurrentID: React.Dispatch<React.SetStateAction<number | undefined>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoggedInRouter = ({
  currentID,
  tempColor,
  setTempColor,
  setCurrentID,
  setIsLoggedIn,
}: propsType): JSX.Element => {
  const [tempFavArray, setTempFavArray] = useState<coinDataType[]>([]);
  const [needReload, setNeedReload] = useState(false);
  const Router = (
    <Routes>
      <Route
        path="/"
        element={
          <LoggedInLayout
            currentID={currentID as number}
            tempColor={tempColor}
          />
        }
      >
        <Route
          path="/home"
          element={
            <Home
              currentID={currentID as number}
              tempColor={tempColor}
              tempFavArray={tempFavArray}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Parameters
              tempColor={tempColor}
              setNeedReload={setNeedReload}
              setTempColor={setTempColor}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentID={setCurrentID}
              currentID={currentID}
              tempFavArray={tempFavArray}
              setTempFavArray={setTempFavArray}
            />
          }
        />
        <Route
          path="/table"
          element={
            <AllCoinsDataTable
              currentID={currentID as number}
              tempColor={tempColor}
              tempFavArray={tempFavArray}
              setTempFavArray={setTempFavArray}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchPage
              currentID={currentID as number}
              tempColor={tempColor}
              tempFavArray={tempFavArray}
              setTempFavArray={setTempFavArray}
            />
          }
        />

        <Route
          path="/coin/:coinID"
          element={
            <IndividualCoinData
              currentID={currentID as number}
              tempColor={tempColor}
              tempFavArray={tempFavArray}
              setTempFavArray={setTempFavArray}
            />
          }
        />
      </Route>

      <Route path="*" element={<ErrorNotFoundPage />} />
    </Routes>
  );
  return Router;
};

export default LoggedInRouter;
