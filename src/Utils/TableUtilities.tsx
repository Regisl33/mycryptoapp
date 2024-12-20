//Import Display Value Component
import DisplayOfValue from "../Components/DisplayOfValue";

//This Function Returns a TD with the DisplayOfValue Component
export const optionTD = (
  type: "$" | "%" | "Date",
  value: number
): JSX.Element => {
  return (
    <td>
      <DisplayOfValue valueType={type} value={value} />
    </td>
  );
};
