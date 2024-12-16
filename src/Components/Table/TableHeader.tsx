//Import Dependencies
import { useEffect } from "react";
//Import Custom Hook
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
//Create and Export the Array with all Table Header for the Colums
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
//Props Type for Content(header Text), userID, tempColor, and the Selected Sort State
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
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //This Function Receives the Content Value and set the Selected Sort State Accordingly
  const handleSortChange = (value: string) => {
    //Test if the Selected Sort State is Already that Value, if it is, it Return the Value + reverse, if not, Just set the Selected Sort State as that Value
    if (selectedSort === value) {
      setSelectedSort(value + "reverse");
    } else {
      setSelectedSort(value);
    }
  };
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);
  //th HTML Return that uses HandleSortChange onClick
  const th = (
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

  return th;
};

export default TableHeader;
