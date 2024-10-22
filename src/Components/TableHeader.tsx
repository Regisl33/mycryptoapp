import React from "react";

type propsType = {
  content: string;
  handleSortChange: (content: string) => void;
};

const TableHeader = ({ content, handleSortChange }: propsType) => {
  return (
    <th id={content} onClick={() => handleSortChange(content)}>
      {content}
    </th>
  );
};

export default TableHeader;
