import React, { useEffect, useState } from "react";
import { coinDataType } from "../Types/AppTypes";

type propsType = {
  userID: number;
};

const Home = ({ userID }: propsType) => {
  const [coinData, setCoinData] = useState<coinDataType[]>([]);

  const getCoinData = async () => {};

  useEffect(() => {}, []);

  return <div></div>;
};

export default Home;
