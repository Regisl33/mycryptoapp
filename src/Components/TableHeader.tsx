type propsType = {
  content: string;
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
};

const TableHeader = ({ content, selectedSort, setSelectedSort }: propsType) => {
  const handleSortChange = (value: string) => {
    if (selectedSort === value) {
      setSelectedSort(selectedSort + "reverse");
    } else {
      setSelectedSort(value);
    }
  };

  return (
    <th id={content} onClick={() => handleSortChange(content)}>
      {content}
    </th>
  );
};

export default TableHeader;
