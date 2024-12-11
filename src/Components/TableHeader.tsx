import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";

export const tableColums = [
  "Rank",
  "Favorite",
  "Symbol",
  "Logo",
  "Name",
  "Market Cap",
  "Price",
  "Volume",
  "1h",
  "1j",
  "7j",
  "14j",
  "30j",
  "200j",
  "1y",
  "Ath",
];

type propsType = {
  content: string;
  currentID: number;
  selectedSort: string;
  tempColor: String;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
};

const TableHeader = ({
  content,
  currentID,
  tempColor,
  selectedSort,
  setSelectedSort,
}: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const handleSortChange = (value: string) => {
    if (selectedSort === value) {
      setSelectedSort(value + "reverse");
    } else {
      setSelectedSort(value);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);
  return (
    <th
      className={
        tempColor.length > 0
          ? tempColor[0] === "D"
            ? "Dshadow"
            : "Lshadow"
          : userData?.color[0] === "D"
          ? "Dshadow"
          : "Lshadow"
      }
      id={content}
      onClick={() => handleSortChange(content)}
    >
      {content}
    </th>
  );
};

export default TableHeader;
